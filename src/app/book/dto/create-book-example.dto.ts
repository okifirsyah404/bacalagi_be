import { IntersectionType } from '@nestjs/swagger';
import { FileUploadDto } from 'src/data/dto/file-upload.dto';
import { CreateBookDto } from './create-book.dto';

export class CreateBookExampleDto extends IntersectionType(
  CreateBookDto,
  FileUploadDto,
) {}
