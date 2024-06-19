import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/response.base';
import { CommonExample } from 'src/utils/example/common.example';
import { AppService } from './app.service';

@ApiInternalServerErrorResponse({
  description: 'Error caused by database or server error',
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   * This HTTP GET request is used for retrieving faq at app. The request does not require a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An object containing faq data.
   *
   */
  @ApiOkResponse({
    description: 'Successfully retrieved faq data',
    schema: {
      example: BaseResponse.ok({
        data: CommonExample.faqExample,
      }),
    },
  })
  @Get('faq')
  async getFaq() {
    const data = await this.appService.getFaq();

    return BaseResponse.ok({
      data,
    });
  }

  /**
   *
   * This HTTP GET request is used for retrieving privacy policy at app. The request does not require a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An object containing privacy policy data.
   *
   */
  @ApiOkResponse({
    description: 'Successfully retrieved privacy policy data',
    schema: {
      example: BaseResponse.ok({
        data: CommonExample.privacyPolicyExample,
      }),
    },
  })
  @Get('privacy-policy')
  async getPrivacyPolicy() {
    const data = await this.appService.getPrivacyPolicy();

    return BaseResponse.ok({
      data,
    });
  }
}
