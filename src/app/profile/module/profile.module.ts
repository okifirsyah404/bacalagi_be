import { Module } from '@nestjs/common';
import { UploadHandlerModule } from 'src/services/upload-handler/module/upload-handler.module';
import { ProfileController } from '../controller/profile.controller';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';

@Module({
  imports: [UploadHandlerModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
