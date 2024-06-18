import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BookDto } from 'src/data/dto/book.dto';
import { Transformer } from 'src/utils/transform/transformer';

export class PredictBookDto extends PickType(BookDto, [
  'title',
  'buyPrice',
  //   'author',
  //   'publisher',
  //   'publishYear',
  //   'ISBN',
  //   'language',
  //   'description',
]) {
  /**
   * Buy price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   *
   */
  @Transform(Transformer.toNumber)
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;
}
