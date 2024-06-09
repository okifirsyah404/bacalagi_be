import { Module } from '@nestjs/common';
import { ProfileController } from '../controller/profile.controller';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
