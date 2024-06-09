import { DynamicModule, Global, Module } from '@nestjs/common';
import { DiNameConstant } from 'src/res/constant/di/di-name.constant';
import {
  DatabaseModuleAsyncOption,
  DatabaseModuleOptions,
} from 'src/utils/interfaces/database-module-option.interface';
import { DatabaseProvider } from '../provider/database.provider';

@Global()
@Module({})
export class DatabaseModule {
  private static _providers: any[] = [DatabaseProvider];

  static forRoot(option?: DatabaseModuleOptions) {
    return {
      module: DatabaseModule,
      imports: [],
      providers: [
        {
          provide: DiNameConstant.DATABASE_MODULE_OPTIONS,
          useValue: option,
        },
        ...this._providers,
      ],
      exports: this._providers,
    };
  }

  static forRootAsync(option?: DatabaseModuleAsyncOption): DynamicModule {
    return {
      module: DatabaseModule,
      imports: option?.imports || [],
      providers: [
        {
          inject: option?.inject || [],
          provide: DiNameConstant.DATABASE_MODULE_OPTIONS,
          useFactory: async (...args: any[]) => {
            const result = await option?.useFactory?.(...args);
            return result;
          },
        },
        ...this._providers,
      ],
      exports: this._providers,
    };
  }
}
