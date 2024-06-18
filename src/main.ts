import multipart from '@fastify/multipart';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app/app.module';
import HttpExceptionInterceptor from './utils/interceptors/http-exception.interceptor';
import { LoggingInterceptor } from './utils/interceptors/logging.interceptor';
import { MainLogger } from './utils/logger/provider/main-logger.provider';
import swaggerDocumentBuilder from './utils/swagger/swagger-document.builder';
import { validationExceptionFactory } from './utils/validator/validation.factory';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      cors: true,
    },
  );

  app.useLogger(app.get(MainLogger));

  app.useGlobalFilters(new HttpExceptionInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(app.get(MainLogger), {
      showLog: false,
    }),
  );

  app.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 10000000, // For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  await swaggerDocumentBuilder(app);

  await app.listen(3000, '0.0.0.0');

  app.get(MainLogger).log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
