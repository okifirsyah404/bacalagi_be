import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/response.base';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
import { AuthExample } from '../swagger/auth.example';
@ApiTags(SwaggerTag.AUTH)
@ApiUnauthorizedResponse({
  description: 'Invalid firebase token id',
  schema: {
    example: BaseResponse.unauthorized(null),
  },
})
@ApiInternalServerErrorResponse({
  description: 'Error caused by database or server error',
})
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   *
   * This HTTP POST request is used for authenticating the user at auth. The request requires a valid firebase token id.
   *
   * Request
   * - firebaseTokenId (string): The firebase token id of the user.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An user JWT token data.
   *
   */
  @ApiCreatedResponse({
    description: 'User sign-in authentication',
    schema: {
      example: AuthExample.postAuth,
    },
  })
  @Post()
  async auth(@Body() dto: AuthenticateDto) {
    const data = await this.service.authenticate(dto);

    return BaseResponse.created({
      data,
    });
  }

  /**
   *
   * This HTTP POST request is used for registering the user at auth/register. The request requires a valid firebase token id.
   *
   * Request
   * - name (string): The name of the user.
   * - phoneNumber (string): The phone number of the user.
   * - regency (string): The city of the user.
   * - province (string): The administration area of the user.
   * - address (string): The address of the user.
   * - firebaseTokenId (string): The firebase token id of the user.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An user object data.
   *
   */
  @ApiCreatedResponse({
    description: 'User sign-in authentication',
    schema: {
      example: AuthExample.postAuthRegister,
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    schema: {
      example: AuthExample.postAuthRegisterSomeFieldEmpty,
    },
  })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const data = await this.service.register(dto);

    return BaseResponse.created({
      data,
    });
  }
}
