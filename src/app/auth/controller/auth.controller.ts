import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/utils/base/response.base';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
@ApiTags(SwaggerTag.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   *
   * This HTTP POST request is used for user sign-in authentication at auth/user/sign-in. The request requires a raw body payload containing the user's email, password, and FCM token.
   *
   * Request Body
   *
   * - email (string, required): The email of the user.
   * - password (string, required): The password of the user.
   * - fcmToken (string, required): The FCM token for push notifications.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An object data.
   *
   * Response Data
   *
   * - role (string): The role of the user, e.g., "USER".
   * - accessToken (string): A token for accessing protected resources.
   *
   */
  @ApiCreatedResponse({
    description: 'User sign-in authentication',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
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
   * This HTTP POST request is used for user registration at auth/user/register. The request requires a raw body payload containing the user's email, password, and FCM token.
   *
   * Request Body
   *
   * - email (string, required): The email of the user.
   * - password (string, required): The password of the user.
   * - fcmToken (string, required): The FCM token for push notifications.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An object data.
   *
   * Response Data
   *
   * - role (string): The role of the user, e.g., "USER".
   * - accessToken (string): A token for accessing protected resources.
   *
   */
  @ApiCreatedResponse({
    description: 'User sign-in authentication',
    schema: {
      example: {
        status: 'Created',
        statusCode: 201,
        message: 'Created',
        data: {
          user: {
            id: 'clxd77y0j00035xykfojf8j63',
            profile: {
              id: 'clxd77y0j00055xyk517q2c3f',
              name: 'Oki Firdaus',
              avatarUrl:
                'images/user/LUN8vnlcTMVUMRo4M0CqrUx88zd2/LUN8vnlcTMVUMRo4M0CqrUx88zd2.png',
              phoneNumber: '+6281234567890',
              adminAreaLocality: 'Jawa Timur',
              cityLocality: 'Jember',
              address: 'Jember',
            },
            account: {
              id: 'clxd77y0j00045xyk712is0e4',
              email: 'a129d4ky4448@bangkit.academy',
              googleId: 'LUN8vnlcTMVUMRo4M0CqrUx88zd2',
            },
          },
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNseGQ3N3kwajAwMDM1eHlrZm9qZjhqNjMiLCJlbWFpbCI6ImExMjlkNGt5NDQ0OEBiYW5na2l0LmFjYWRlbXkiLCJpYXQiOjE3MTgyNzk0NTIsImV4cCI6MTcyMDg3MTQ1Mn0.4R_eJZ3ltHIMSFx0H47YOiuddhiNEPZS0b3x9PZMrKU',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
  })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const data = await this.service.register(dto);

    return BaseResponse.created({
      data,
    });
  }
}
