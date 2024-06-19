import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BookDto } from 'src/data/dto/book.dto';
import { Transformer } from 'src/utils/transform/transformer';

export class UpdateBookDto extends PickType(BookDto, [
  'title',
  'author',
  'publisher',
  'publishYear',
  'buyPrice',
  'finalPrice',
  'ISBN',
  'language',
  'description',
]) {
  /**
   * ISBN field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsString()`
   */
  @ApiProperty({
    type: 'string',
    example: 2007,
  })
  @Transform(Transformer.toNumber)
  @IsNotEmpty()
  @IsNumber()
  publishYear: number;

  /**
   * Buy price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   */
  @ApiProperty({
    type: 'string',
    example: 120000,
  })
  @Transform(Transformer.toNumber)
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;

  /**
   * Final price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   */
  @ApiProperty({
    type: 'string',
    example: 120000,
  })
  @Transform(Transformer.toNumber)
  @IsNotEmpty()
  @IsNumber()
  finalPrice: number;
}
