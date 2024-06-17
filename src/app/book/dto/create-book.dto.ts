import { PickType } from '@nestjs/swagger';
import { BookDto } from 'src/data/dto/book.dto';

export class CreateBookDto extends PickType(BookDto, [
  'title',
  'author',
  'publisher',
  'publishYear',
  'buyPrice',
  'ISBN',
  'language',
  'description',
]) {}
