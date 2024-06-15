import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileRepository } from '../repository/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly logger: MainLogger,
    private readonly repository: ProfileRepository,
  ) {}

  async getProfile(id: string) {
    const data = await this.repository.getProfileById(id);

    if (!data) {
      throw new UnauthorizedException('Invalid token');
    }

    return data;
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    const prevData = await this.repository.getProfileById(id);

    if (!prevData) {
      throw new UnauthorizedException();
    }

    const updatedData = await this.repository.updateProfileById(id, {
      name: dto.name || prevData.profile.name,
      phoneNumber: dto.phoneNumber || prevData.profile.phoneNumber,
      cityLocality: dto.regency || prevData.profile.cityLocality,
      adminAreaLocality: dto.province || prevData.profile.adminAreaLocality,
      address: dto.address || prevData.profile.address,
    });

    return updatedData;
  }
}
