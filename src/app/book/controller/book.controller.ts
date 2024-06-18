import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindManyBookQueryParamDto } from '../dto/find-many-book-query-param.dto';
import { SearchBookQueryParamDto } from '../dto/search-book-query-param.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookService } from '../service/book.service';

@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Post()
  create(@Req() req: any, @Body() createBookDto: CreateBookDto) {
    const userId = req.payload.id;

    // TODO: Implement the create method
  }

  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get()
  findAll(@Req() req: any, @Query() query: FindManyBookQueryParamDto) {
    const userId = req.payload.id;

    // TODO: Implement the findAll method
  }

  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get('search')
  search(@Req() req: any, @Query() query: SearchBookQueryParamDto) {
    const userId = req.payload.id;

    // TODO: Implement the search method
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Get('author')
  findAllByAuthor(@Req() req: any, @Query() query: FindManyBookQueryParamDto) {
    const userId = req.payload.id;

    // TODO: Implement the findAllByAuthor method
  }
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') postId: string) {
    const userId = req.payload.id;
    // TODO: Implement the findOne method
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Get('author/:id')
  fionOneByAuthor(@Req() req: any, @Param('id') postId: string) {
    const userId = req.payload.id;
    // TODO: Implement the findOneByAuthor method
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const userId = req.payload.id;

    // TODO: Implement the update method
  }
}
