import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Transformer } from 'src/utils/transform/transformer';

export class QueryDto {
  @Transform(Transformer.toNumber)
  @IsNumber(
    {},
    {
      message: 'Page must be a number',
    },
  )
  @IsOptional()
  page?: number;

  @Transform(Transformer.toNumber)
  @IsNumber(
    {},
    {
      message: 'Size must be a number',
    },
  )
  @IsOptional()
  size?: number;
}
