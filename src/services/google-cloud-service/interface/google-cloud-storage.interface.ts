import { StorageOptions } from '@google-cloud/storage';

export type GoogleCloudStorageModuleOptions = Omit<StorageOptions, 'keyFile'>;

export interface GoogleCloudStorageModuleAsyncOptions {
  imports: any[];
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<GoogleCloudStorageModuleOptions>
    | GoogleCloudStorageModuleOptions;
  inject?: any[];
}
