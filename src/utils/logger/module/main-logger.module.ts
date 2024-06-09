import { DynamicModule, Global, Module } from '@nestjs/common';
import { MainLogger } from '../provider/main-logger.provider';

/**
 * Module for injecting a logger service as singleton to other depedency.
 *
 * This module following NestJS modular pattern.
 *
 * @example
 * Module({
 *  imports: [
 *   LoggerModule,
 *  ],
 *  controllers: [AppController],
 *  providers: [AppService],
 * })
 * export class AppModule {}
 */

@Global()
@Module({})
export class MainLoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: MainLoggerModule,
      providers: [MainLogger],
      exports: [MainLogger],
    };
  }
}
