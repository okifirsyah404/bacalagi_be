import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'src/data/database/provider/database.provider';
import DatabaseSelector from 'src/data/selector/database.selector';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileRepository {
  constructor(private readonly database: DatabaseProvider) {}

  async getProfileById(id: string) {
    const profile = await this.database.user.findUnique({
      where: {
        id,
      },
      select: DatabaseSelector.user,
    });

    return profile;
  }

  async updateProfileById(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.database.profile.update({
      where: {
        userId: id,
      },
      data: {
        ...updateProfileDto,
      },
    });

    return profile;
  }
}
