import { Module } from '@nestjs/common';
import { join } from 'path';
import { DatabaseModule } from 'src/data/database/module/database.module';
import { FirebaseAdminModule } from 'src/services/firebase/module/firebase-admin.module';
import { MainLoggerModule } from 'src/utils/logger/module/main-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module/auth.module';
import { AuthRepository } from './auth/repository/auth.repository';
import { ProfileModule } from './profile/module/profile.module';
import { ProfileRepository } from './profile/repository/profile.repository';

@Module({
  imports: [
    MainLoggerModule.forRoot(),
    DatabaseModule.forRootAsync({
      useFactory: () => ({
        logs: false,
      }),
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        credential: join(
          __dirname,
          '..',
          '..',
          'credential',
          'try-learning-firebase-annas-firebase-adminsdk-bh7fi-733c52d926.json',
        ),
      }),
    }),
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthRepository, ProfileRepository],
})
export class AppModule {}
