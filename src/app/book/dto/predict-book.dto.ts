import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BookDto } from 'src/data/dto/book.dto';
import { Transformer } from 'src/utils/transform/transformer';

export class PredictBookDto extends PickType(BookDto, ['buyPrice']) {
  /**
   * Buy price field.
   *
   * @decorator `@IsNotEmpty()`
   * @decorator `@IsNumber()`
   *
   */
  @ApiProperty({
    type: 'string',
    example: 120000,
  })
  @Transform(Transformer.toNumber)
  @IsNotEmpty()
  @IsNumber()
  buyPrice: number;
}
