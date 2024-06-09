import { Injectable, NotFoundException } from '@nestjs/common';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
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
      throw new NotFoundException('Profile not found');
    }

    return data;
  }
}
