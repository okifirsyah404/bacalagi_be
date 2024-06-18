import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/data/dto/query-param.dto';

export class SearchBookQueryParamDto extends QueryDto {
  constructor() {
    super();
  }

  @IsString({
    message: 'Title must be a string',
  })
  @IsOptional()
  title?: string;
}
