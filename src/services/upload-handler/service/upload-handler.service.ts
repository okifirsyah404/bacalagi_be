import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleCloudStorageService } from 'src/services/google-cloud-service/service/google-cloud-service.service';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import * as util from 'util';

@Injectable()
export class UploadHandlerService {
  constructor(
    private readonly logger: MainLogger,
    private readonly httpService: HttpService,
    private readonly googleCloudStorageService: GoogleCloudStorageService,
  ) {}

  private readonly publicDir = path.join(process.cwd(), 'public');

  private readonly imageDir = path.join(this.publicDir, 'images');

  private copyFileAsync = util.promisify(fs.copyFile);
  private unlinkAsync = util.promisify(fs.unlink);

  /**
   * Initializes the user image by downloading it from the provided URL and saving it to the user's directory.
   * @param imageUrl - The URL of the user image.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the file path of the saved image.
   */
  async initUserImage(imageUrl: string, userId: string): Promise<string> {
    await this._checkPublicDir();

    const userDir = path.join(this.imageDir, 'user');

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }

    const filePath = path.join(userDir, `${userId}.png`);

    const writer = fs.createWriteStream(filePath);

    const response = await this.httpService.axiosRef(imageUrl, {
      responseType: 'stream',
      method: 'GET',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', async () => {
        try {
          const uploadResult =
            await this.googleCloudStorageService.initUploadUserImage(filePath);
          resolve(uploadResult);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Uploads a user's image avatar.
   *
   * @param userId - The ID of the user.
   * @param filePath - The path of the file to be uploaded.
   * @returns A Promise that resolves to the URL of the uploaded file.
   */
  async uploadUserImageAvatar(
    userId: string,
    filePath: string,
  ): Promise<string> {
    await this._checkPublicDir();

    const userDir = path.join(this.imageDir, 'user');

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }

    const fileExtension = path.extname(filePath);
    const newFile = path.join(userDir, `${userId}${fileExtension}`);

    await this._unlinkPreviousImage(`user/`, newFile);

    await new Promise((resolve) => setTimeout(resolve, 100));

    fs.copyFileSync(filePath, newFile);

    await new Promise((resolve) => setTimeout(resolve, 100));

    this.logger.debug(`File copied: ${filePath}`);

    fs.unlinkSync(filePath);

    await new Promise((resolve) => setTimeout(resolve, 200));

    return new Promise((resolve, reject) => {
      this.googleCloudStorageService.uploadUserImage(newFile).then(
        (uploadedFileUrl) => {
          fs.unlinkSync(newFile);
          resolve(uploadedFileUrl);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  /**
   * Uploads a post image to the server and returns the URL of the uploaded image.
   *
   * @param postId - The ID of the post.
   * @param filePath - The path of the image file to be uploaded.
   * @returns A Promise that resolves to the URL of the uploaded image.
   */
  async uploadPostImage(postId: string, filePath: string): Promise<string> {
    await this._checkPublicDir();

    const postDir = path.join(this.imageDir, 'post');

    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir);
    }

    const fileExtension = path.extname(filePath);
    const newFile = path.join(postDir, `${postId}${fileExtension}`);

    await this._unlinkPreviousImage(`post/`, newFile);

    await new Promise((resolve) => setTimeout(resolve, 100));

    fs.copyFileSync(filePath, newFile);

    await new Promise((resolve) => setTimeout(resolve, 100));

    this.logger.debug(`File copied: ${filePath}`);

    fs.unlinkSync(filePath);

    await new Promise((resolve) => setTimeout(resolve, 200));

    return new Promise((resolve, reject) => {
      this.googleCloudStorageService.uploadPostImage(newFile).then(
        (uploadedFileUrl) => {
          fs.unlinkSync(newFile);
          resolve(uploadedFileUrl);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  /**
   * Checks if the necessary directories exist and creates them if they don't.
   * The directories include the public directory, image directory, user directory, and post directory.
   */
  private async _checkPublicDir() {
    if (!fs.existsSync(this.publicDir)) {
      fs.mkdirSync(this.publicDir);
    }

    if (!fs.existsSync(this.imageDir)) {
      fs.mkdirSync(this.imageDir);
    }

    if (!fs.existsSync(path.join(this.imageDir, 'user'))) {
      fs.mkdirSync(path.join(this.imageDir, 'user'));
    }

    if (!fs.existsSync(path.join(this.imageDir, 'post'))) {
      fs.mkdirSync(path.join(this.imageDir, 'post'));
    }
  }

  /**
   *
   * This function is used to unlink previous image.
   *
   * @param endPath
   * @param file
   *
   */
  private async _unlinkPreviousImage(endPath: string, file: string) {
    try {
      const dir = path.join(this.imageDir, endPath);
      const fsDir = fs.readdirSync(dir);

      for await (const fsFile of fsDir) {
        const fileName = path
          .basename(file)
          .slice(0, -path.extname(file).length);

        if (fsFile.includes(fileName)) {
          await this.unlinkAsync(path.join(dir, fsFile));
        }
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * Gets the relative path of a file with respect to the public directory.
   *
   * @deprecated This function is deprecated and will be removed in the future. Not using local paths is recommended. Use storage URLs instead.
   *
   * @param filePath - The absolute file path.
   * @returns The relative file path.
   */
  private _getRelativePath(filePath: string): string {
    let relativePath = path.relative(this.publicDir, filePath);
    if (path.sep === '\\') {
      relativePath = relativePath.replace(/\\/g, '/');
    }
    return relativePath;
  }
}
