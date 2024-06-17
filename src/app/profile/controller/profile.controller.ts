import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify';
import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { FileUploadDto } from 'src/data/dto/file-upload.dto';
import { BaseResponse } from 'src/utils/base/response.base';
import { ImageMultipart } from 'src/utils/helpers/multipart/image-multipart';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../service/profile.service';
import { ProfileExample } from '../swagger/profile.example';

@ApiUnauthorizedResponse({
  description: 'Unauthorized user',
  schema: {
    example: BaseResponse.unauthorized(null),
  },
})
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
  @ApiOkResponse({
    description: 'Successfully retrieved profile data',
    schema: {
      example: BaseResponse.ok({
        data: ProfileExample.getProfile,
      }),
    },
  })
  @Get()
  async getProfile(@Req() req: any) {
    const id = req.payload.id;

    const data = await this.profileService.getProfile(id);

    return BaseResponse.ok({
      data,
    });
  }

  /**
   * This HTTP PUT request is used for updating the user's profile at profile. The request requires a valid JWT token.
   *
   * Request
   *
   * The request body must contain the following fields:
   *
   * - name (string): The name of the user.
   * - phoneNumber (string): The phone number of the user.
   * - province (string): The admin area locality of the user.
   * - regency (string): The city locality of the user.
   * - address (string): The address of the user.
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
  @ApiOkResponse({
    description: 'Profile updated successfully',
    schema: {
      example: BaseResponse.ok({
        data: ProfileExample.updateProfile,
      }),
    },
  })
  @Put()
  async updateProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
    const id = req.payload.id;

    const data = await this.profileService.updateProfile(id, body);

    return BaseResponse.ok({
      data,
    });
  }

  /**
   * This HTTP PUT request is used for uploading the user's profile image at profile/upload. The request requires a valid JWT token.
   *
   * Request
   *
   * The request body must contain the following fields:
   *
   * - image (file): The image file to upload.
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
  @ApiTags(SwaggerTag.PROFILE_IMAGE)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile image',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    description: 'Profile image uploaded successfully',
    schema: {
      example: BaseResponse.ok({
        data: ProfileExample.updateProfile,
      }),
    },
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type. Only image files are allowed.',
    schema: {
      example: BaseResponse.unsupportedMediaType(null),
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: ImageMultipart.imageUploadPath,
      filter: ImageMultipart.imageValidationMultipartFilter,
    }),
  )
  @Put('/upload')
  async uploadProfile(
    @Req() req: any,
    @UploadedFile()
    file: MemoryStorageFile,
  ) {
    const id = req.payload.id;

    const data = await this.profileService.updateProfileImage(id, file);

    return BaseResponse.ok({
      data,
    });
  }
}
