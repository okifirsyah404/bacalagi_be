import {
  ConsoleLogger,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DiNameConstant } from 'src/res/constant/di/di-name.constant';
import { DatabaseModuleOptions } from 'src/utils/interfaces/database-module-option.interface';

@Injectable()
export class DatabaseProvider
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(DiNameConstant.DATABASE_MODULE_OPTIONS)
    private readonly options?: DatabaseModuleOptions,
  ) {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    this._databaseLogging();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private _databaseLogging() {
    if (!this.options) {
      return;
    }

    if (!this.options.logs) {
      return;
    }

    const logInstance = this.options.loggingInstance ?? new ConsoleLogger();

    this.$on('query', (e) => {
      logInstance.log(`Operation "${e.query}" took ${e.duration}ms`);
    });
  }
}
