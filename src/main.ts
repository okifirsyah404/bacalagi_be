import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import HttpExceptionInterceptor from './utils/interceptors/http-exception.interceptor';
import { MainLogger } from './utils/logger/provider/main-logger.provider';
import { validationExceptionFactory } from './utils/validator/validation.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

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

  await app.listen(3000);

  app.get(MainLogger).log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
