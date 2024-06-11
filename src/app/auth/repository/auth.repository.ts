import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'src/data/database/provider/database.provider';
import DatabaseSelector from 'src/data/selector/database.selector';

@Injectable()
export class AuthRepository {
  constructor(private readonly database: DatabaseProvider) {}

  async checkUserExists(email: string) {
    const user = await this.database.account.findUnique({
      where: {
        email,
      },
    });

    return user ? true : false;
  }

  async createUser({
    email,
    googleId,
    name,
    cityLocality,
    phoneNumber,
    adminAreaLocality,
    address,
    avatarUrl,
  }: {
    email: string;
    googleId: string;
    name: string;
    cityLocality: string;
    phoneNumber: string;
    adminAreaLocality: string;
    address: string;
    avatarUrl: string;
  }) {
    const data = await this.database.user.create({
      data: {
        account: {
          create: {
            email,
            googleId,
          },
        },
        profile: {
          create: {
            name,
            phoneNumber,
            cityLocality,
            adminAreaLocality,
            address,
            avatarUrl,
          },
        },
      },
      select: {
        ...DatabaseSelector.user,
        account: {
          select: DatabaseSelector.account,
        },
      },
    });

    return data;
  }

  async findAccountByEmail(email: string) {
    const data = await this.database.account.findUnique({
      where: {
        email,
      },

      select: {
        ...DatabaseSelector.account,
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  async updateProfileImageAvatarUrl(id: string, avatarUrl: string) {
    const data = await this.database.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: {
            avatarUrl,
          },
        },
      },
      select: {
        ...DatabaseSelector.user,
        account: {
          select: DatabaseSelector.account,
        },
      },
    });

    return data;
  }
}
