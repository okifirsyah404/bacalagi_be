import { DynamicModule, Global, Module } from '@nestjs/common';
import { FirebaseConstants } from '../constant/firebase.constant';
import {
  FirebaseAdminModuleAsyncOptions,
  FirebaseAdminModuleOptions,
} from '../interface/firebase-admin-option.interface';
import { FirebaseAdminService } from '../service/firebase-admin.service';

@Global()
@Module({})
export class FirebaseAdminModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    const providers = [
      {
        provide: FirebaseConstants.FIREBASE_ADMIN_OPTIONS,
        useValue: options,
      },
      FirebaseAdminService,
    ];

    return {
      module: FirebaseAdminModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const providers = [
      {
        provide: FirebaseConstants.FIREBASE_ADMIN_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      FirebaseAdminService,
    ];

    return {
      module: FirebaseAdminModule,
      imports: options.imports || [],
      providers: providers,
      exports: providers,
    };
  }
}
