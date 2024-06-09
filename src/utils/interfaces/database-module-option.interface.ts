import { ModuleMetadata } from '@nestjs/common';
import { MainLogger } from '../logger/provider/main-logger.provider';

export interface DatabaseModuleOptions {
  logs?: boolean;
  loggingInstance?: MainLogger;
  imports?: any[];
}

export interface DatabaseModuleAsyncOption
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<DatabaseModuleOptions> | DatabaseModuleOptions;
  inject?: any[];
  imports?: any[];
}
