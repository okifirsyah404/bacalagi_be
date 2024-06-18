import { DynamicModule, Global, Module } from '@nestjs/common';
import { GoogleCloudStorageConstants } from '../constant/google-cloud-storage.constant';
import {
  GoogleCloudStorageModuleAsyncOptions,
  GoogleCloudStorageModuleOptions,
} from '../interface/google-cloud-storage.interface';
import { GoogleCloudStorageService } from '../service/google-cloud-service.service';

@Global()
@Module({})
export class GoogleCloudStorageModule {
  static forRoot(options: GoogleCloudStorageModuleOptions): DynamicModule {
    const providers = [
      {
        provide: GoogleCloudStorageConstants.GOOGLE_CLOUD_STORAGE_OPTIONS,
        useValue: options,
      },
      GoogleCloudStorageService,
    ];

    return {
      module: GoogleCloudStorageModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(
    options: GoogleCloudStorageModuleAsyncOptions,
  ): DynamicModule {
    const providers = [
      {
        provide: GoogleCloudStorageConstants.GOOGLE_CLOUD_STORAGE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      GoogleCloudStorageService,
    ];

    return {
      module: GoogleCloudStorageModule,
      imports: options.imports || [],
      providers: providers,
      exports: providers,
    };
  }
}
