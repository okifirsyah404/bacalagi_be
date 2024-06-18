import { Bucket, Storage } from '@google-cloud/storage';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { relative, sep } from 'path';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { GoogleCloudStorageConstants } from '../constant/google-cloud-storage.constant';
import { GoogleCloudStorageModuleOptions } from '../interface/google-cloud-storage.interface';

@Injectable()
export class GoogleCloudStorageService implements OnModuleInit {
  private storage: Storage;
  private mainBucket: Bucket;
  private baseUrl: string = 'https://storage.googleapis.com';

  constructor(
    private readonly logger: MainLogger,
    @Inject(GoogleCloudStorageConstants.GOOGLE_CLOUD_STORAGE_OPTIONS)
    private options: GoogleCloudStorageModuleOptions,
  ) {}

  onModuleInit() {
    this.storage = new Storage();

    this.storage.getBuckets().then((buckets) => {
      const bucket = buckets[0][0];

      this.mainBucket = bucket;

      this.logger.log(`Buckets: ${bucket.name}`);
    });
  }

  getStorage(): Storage {
    return this.storage;
  }

  /**
   * Initializes the upload of a user image to the Google Cloud Storage.
   * @param filePath - The path of the image file to be uploaded.
   * @returns A Promise that resolves to the URL of the uploaded file.
   */
  async initUploadUserImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = this.getFileName(filePath);
      const fileNameWithoutExt = fileName.split('.').shift();

      this.mainBucket.upload(
        filePath,
        {
          destination: `images/user/${fileNameWithoutExt}/` + fileName,
        },
        (err, file) => {
          if (err) {
            this.logger.error(err);
            reject(err);
          } else {
            this.logger.debug(`File uploaded: ${file.name}`);
            const uploadedFileUrl = `${this.baseUrl}/${this.mainBucket.name}/${file.name}`;
            this.logger.debug(`File URL: ${uploadedFileUrl}`);
            resolve(uploadedFileUrl);
          }
        },
      );
    });
  }

  /**
   * Uploads a user image to the cloud storage.
   * @param filePath - The path of the image file to be uploaded.
   * @returns A Promise that resolves to the URL of the uploaded image.
   */
  async uploadUserImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = this.getFileName(filePath);
      const fileNameWithoutExt = fileName.split('.').shift();

      this.mainBucket.deleteFiles(
        {
          prefix: `images/user/` + fileNameWithoutExt,
        },

        async (err) => {
          if (err) {
            this.logger.error(err);
            reject(err);
          }

          await this.initUploadUserImage(filePath).then(
            (uploadedFileUrl) => {
              resolve(uploadedFileUrl);
            },
            (error) => {
              reject(error);
            },
          );
        },
      );
    });
  }

  /**
   * Uploads a post image to the Google Cloud Storage.
   *
   * @param filePath - The path of the image file to upload.
   * @returns A Promise that resolves to the URL of the uploaded image.
   */
  async uploadPostImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = this.getFileName(filePath);
      const fileNameWithoutExt = fileName.split('.').shift();

      this.mainBucket.upload(
        filePath,
        {
          destination: `images/post/${fileNameWithoutExt}/` + fileName,
        },
        (err, file) => {
          if (err) {
            this.logger.error(err);
            reject(err);
          } else {
            this.logger.debug(`File uploaded: ${file.name}`);
            const uploadedFileUrl = `${this.baseUrl}/${this.mainBucket.name}/${file.name}`;
            this.logger.debug(`File URL: ${uploadedFileUrl}`);
            resolve(uploadedFileUrl);
          }
        },
      );
    });
  }

  /**
   * Returns the file name from the given file path.
   * @param filePath - The file path.
   * @returns The file name.
   */
  private getFileName(filePath: string): string {
    let relativePath = relative(process.cwd(), filePath);
    if (sep === '\\') {
      relativePath = relativePath.replace(/\\/g, '/');
    }

    if (sep === '/') {
      relativePath = relativePath.replace(/\//g, '/');
    }

    return relativePath.split('/').pop();
  }
}
