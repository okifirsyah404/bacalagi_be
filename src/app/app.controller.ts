import { Controller, Get } from '@nestjs/common';
import { BaseResponse } from 'src/utils/base/response.base';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('faq')
  async getFaq() {
    const data = await this.appService.getFaq();

    return BaseResponse.ok({
      data,
    });
  }

  @Get('privacy-policy')
  async getPrivacyPolicy() {
    const data = await this.appService.getPrivacyPolicy();

    return BaseResponse.ok({
      data,
    });
  }
}
