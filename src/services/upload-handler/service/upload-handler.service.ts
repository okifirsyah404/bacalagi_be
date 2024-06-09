import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join, relative, sep } from 'path';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';

@Injectable()
export class UploadHandlerService {
  constructor(
    private readonly logger: MainLogger,
    private readonly httpService: HttpService,
  ) {}

  private readonly publicDir = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'public',
  );

  private readonly imageDir = join(this.publicDir, 'images');

  /**
   * Initializes the user image by downloading it from the provided URL and saving it to the user's directory.
   * @param imageUrl - The URL of the user image.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the file path of the saved image.
   */
  async initUserImage(imageUrl: string, userId: string): Promise<string> {
    await this._checkPublicDir();

    const userDir = join(this.imageDir, 'user', userId);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }

    const filePath = join(userDir, `${userId}.png`);

    const writer = fs.createWriteStream(filePath);

    const response = await this.httpService.axiosRef(imageUrl, {
      responseType: 'stream',
      method: 'GET',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(this.getRelativePath(filePath)));
      writer.on('error', reject);
    });
  }

  private async _checkPublicDir() {
    if (!fs.existsSync(this.publicDir)) {
      fs.mkdirSync(this.publicDir);
    }

    if (!fs.existsSync(this.imageDir)) {
      fs.mkdirSync(this.imageDir);
    }

    if (!fs.existsSync(join(this.imageDir, 'user'))) {
      fs.mkdirSync(join(this.imageDir, 'user'));
    }

    if (!fs.existsSync(join(this.imageDir, 'post'))) {
      fs.mkdirSync(join(this.imageDir, 'post'));
    }
  }

  /**
   * Gets the relative path of a file with respect to the public directory.
   * @param filePath - The absolute file path.
   * @returns The relative file path.
   */
  private getRelativePath(filePath: string): string {
    let relativePath = relative(this.publicDir, filePath);
    if (sep === '\\') {
      relativePath = relativePath.replace(/\\/g, '/');
    }
    return relativePath;
  }
}
