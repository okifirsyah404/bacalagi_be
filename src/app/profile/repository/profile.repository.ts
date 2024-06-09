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
      select: DatabaseSelector.user,
    });

    return profile;
  }
}
