import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/data/dto/query-param.dto';

export class FindManyBookQueryParamDto extends QueryDto {
  constructor() {
    super();
  }

  @IsString({
    message: 'Location must be a string',
  })
  @IsOptional()
  location?: string;
}
