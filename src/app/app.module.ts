import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { DatabaseModule } from 'src/data/database/module/database.module';
import { FirebaseAdminModule } from 'src/services/firebase/module/firebase-admin.module';
import { GoogleCloudStorageModule } from 'src/services/google-cloud-service/module/google-cloud-service.module';
import { MainLoggerModule } from 'src/utils/logger/module/main-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module/auth.module';
import { BookModule } from './book/module/book.module';
import { ProfileModule } from './profile/module/profile.module';

@Module({
  imports: [
    MainLoggerModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 50,
      },
    ]),
    DatabaseModule.forRootAsync({
      useFactory: () => ({
        logs: false,
      }),
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        credential: join(
          process.cwd(),
          'credential',
          process.env.FIREBASE_FILE,
        ),
      }),
    }),
    GoogleCloudStorageModule.forRootAsync({
      imports: [],
      useFactory: () => ({}),
    }),
    AuthModule,
    ProfileModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
