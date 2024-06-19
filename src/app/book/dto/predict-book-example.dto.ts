import { IntersectionType } from '@nestjs/swagger';
import { FileUploadDto } from 'src/data/dto/file-upload.dto';
import { PredictBookDto } from './predict-book.dto';

export class PredictBookExampleDto extends IntersectionType(
  PredictBookDto,
  FileUploadDto,
) {}
