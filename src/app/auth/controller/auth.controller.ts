import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from 'src/utils/base/response.base';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async auth(@Body() dto: AuthenticateDto) {
    const data = await this.service.authenticate(dto);

    return BaseResponse.created({
      data,
    });
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const data = await this.service.register(dto);

    return BaseResponse.created({
      data,
    });
  }
}
