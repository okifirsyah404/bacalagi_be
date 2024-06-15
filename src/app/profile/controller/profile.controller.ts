import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { BaseResponse } from 'src/utils/base/response.base';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../service/profile.service';

@ApiInternalServerErrorResponse({
  description: 'Error caused by database or server error',
})
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * This HTTP GET request is used for retrieving the user's profile at profile. The request requires a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An user object data.
   *
   */
  @ApiTags(SwaggerTag.PROFILE)
  @Get()
  async getProfile(@Req() req: any) {
    const id = req.payload.id;

    const data = await this.profileService.getProfile(id);

    return BaseResponse.ok({
      data,
    });
  }

  @ApiTags(SwaggerTag.PROFILE)
  @Put()
  async updateProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
    const id = req.payload.id;

    const data = await this.profileService.updateProfile(id, body);

    return BaseResponse.ok({
      data,
    });
  }

  /**
   * This HTTP GET request is used for retrieving the user's profile at profile. The request requires a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An object data.
   *
   */
  @ApiTags(SwaggerTag.PROFILE_IMAGE)
  @Put('/upload')
  async uploadProfile() {
    return BaseResponse.ok({
      data: 'Profile uploaded',
    });
  }
}
