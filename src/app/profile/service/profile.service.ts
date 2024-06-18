import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UploadHandlerService } from 'src/services/upload-handler/service/upload-handler.service';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileRepository } from '../repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly logger: MainLogger,
    private readonly repository: ProfileRepository,
    private readonly uploadHandlerService: UploadHandlerService,
  ) {}

  async getProfile(id: string) {
    const data = await this.repository.getProfileById(id).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException();
    });

    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }
    return data.profile;
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    const prevData = await this.repository.getProfileById(id).catch((error) => {
      this.logger.error(error);
      throw new InternalServerErrorException();
    });

    if (!prevData) {
      throw new UnauthorizedException();
    }

    const updatedData = await this.repository
      .updateProfileById(id, {
        name: dto.name || prevData.profile.name,
        phoneNumber: dto.phoneNumber || prevData.profile.phoneNumber,
        cityLocality: dto.regency || prevData.profile.cityLocality,
        adminAreaLocality: dto.province || prevData.profile.adminAreaLocality,
        address: dto.address || prevData.profile.address,
      })
      .catch((error) => {
        this.logger.error(error);
        throw new InternalServerErrorException();
      });

    return updatedData;
  }

  async updateProfileImage(id: string, file: any) {
    const prevData = await this.repository.getProfileById(id);

    if (!prevData) {
      throw new UnauthorizedException();
    }

    const filePath = await this.uploadHandlerService
      .uploadUserImageAvatar(id, file.path)
      .catch((error) => {
        this.logger.error(error);
        throw new InternalServerErrorException();
      });

    const updatedData = await this.repository.updateProfileImage(id, filePath);

    return updatedData;
  }
}
