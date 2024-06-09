import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { BaseResponse } from 'src/utils/base/response.base';
import { ProfileService } from '../service/profile.service';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: any) {
    const id = req.payload.id;

    const data = await this.profileService.getProfile(id);

    return BaseResponse.ok({
      data,
    });
  }
}
