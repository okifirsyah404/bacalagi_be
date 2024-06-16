import { UploadFilterFile } from '@blazity/nest-file-fastify';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { join } from 'path';

export class ImageMultipart {
  static field = 'file';
  static imageFieldName = 'image';

  static imageUploadPath = join(process.cwd(), 'temp', 'upload');

  static imageValidationMultipartFilter(
    req: FastifyRequest,
    file: UploadFilterFile,
  ): boolean {
    if (!file.mimetype.includes('image')) {
      throw new UnsupportedMediaTypeException(
        'Image file is not supported. Please upload an image file.',
      );
    }

    if (
      !file.mimetype.includes('jpg') &&
      !file.mimetype.includes('jpeg') &&
      !file.mimetype.includes('png')
    ) {
      throw new UnsupportedMediaTypeException(
        'Image file is not supported. Please upload a jpg, jpeg, or png file.',
      );
    }

    return true;
  }
}
