import { Controller, Get, Put, Req, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { BaseResponse } from 'src/utils/base/response.base';
import { ProfileService } from '../service/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';

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

  @UseGuards(AuthGuard)
  @Put()
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const id = req.payload.id;
    const data = await this.profileService.updateProfile(id, updateProfileDto);

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
