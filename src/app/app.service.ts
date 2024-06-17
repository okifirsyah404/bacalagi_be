import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseProvider } from 'src/data/database/provider/database.provider';

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseProvider) {}

  async getFaq() {
    const faq = await this.database.frequentlyAskedQuestion
      .findMany({
        select: {
          id: true,
          question: true,
          answer: true,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return faq;
  }

  async getPrivacyPolicy() {
    const privacyPolicy = await this.database.privacyPolicy
      .findMany({
        select: {
          id: true,
          title: true,
          content: true,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return privacyPolicy;
  }
}
