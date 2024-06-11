import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { BaseResponse } from 'src/utils/base/response.base';
import { ProfileService } from '../service/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Req() req: any) {
    const id = req.payload.id;

    const data = await this.profileService.getProfile(id);

    return BaseResponse.ok({
      data,
    });
  }

  @Put('/upload')
  async uploadProfile() {
    return BaseResponse.ok({
      data: 'Profile uploaded',
    });
  }
}
