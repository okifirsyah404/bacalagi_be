import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UploadHandlerModule } from 'src/services/upload-handler/module/upload-handler.module';
import { AuthController } from '../controller/auth.controller';
import { AuthRepository } from '../repository/auth.repository';
import { AuthService } from '../service/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '30d' },
    }),
    UploadHandlerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
