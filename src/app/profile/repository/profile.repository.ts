import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'src/data/database/provider/database.provider';
import DatabaseSelector from 'src/data/selector/database.selector';

@Injectable()
export class ProfileRepository {
  constructor(private readonly database: DatabaseProvider) {}

  async getProfileById(id: string) {
    const profile = await this.database.user.findUnique({
      where: {
        id,
      },
      select: {
        ...DatabaseSelector.user,
        account: {
          select: DatabaseSelector.account,
        },
      },
    });

    return profile;
  }

  async updateProfileById(
    id: string,
    data: {
      name: string;
      cityLocality: string;
      phoneNumber: string;
      adminAreaLocality: string;
      address?: string;
    },
  ) {
    const profile = await this.database.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            cityLocality: data.cityLocality,
            adminAreaLocality: data.adminAreaLocality,
            address: data.address,
          },
        },
      },
      select: {
        ...DatabaseSelector.user,
      },
    });

    return profile;
  }

  async updateProfileImage(id: string, imageUrl: string) {
    const profile = await this.database.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            avatarUrl: imageUrl,
          },
        },
      },
      select: {
        ...DatabaseSelector.user,
      },
    });

    return profile;
  }
}
