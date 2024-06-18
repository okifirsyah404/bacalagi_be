import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify';
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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import {
  BasePaginationResponse,
  BaseResponse,
} from 'src/utils/base/response.base';
import { ImageMultipart } from 'src/utils/helpers/multipart/image-multipart';
import { SwaggerTag } from 'src/utils/swagger/swagger-tag';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindManyBookQueryParamDto } from '../dto/find-many-book-query-param.dto';
import { PredictBookDto } from '../dto/predict-book.dto';
import { SearchBookQueryParamDto } from '../dto/search-book-query-param.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookService } from '../service/book.service';
import { BookExample } from '../swagger/book.example';

@ApiInternalServerErrorResponse({
  description: 'Error caused by database or server error',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized user',
  schema: {
    example: BaseResponse.unauthorized(null),
  },
})
@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly service: BookService) {}

  /**
   * This HTTP GET request is used for retrieving all open sale book at book. The request requires a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - pagination (object): An object containing pagination data.
   * - data (object): An array of open sale book data.
   *
   *
   */
  @ApiOkResponse({
    description: 'Get all open sale book',
    schema: {
      example: BasePaginationResponse.ok({
        pagination: BookExample.paginationExample,
        data: BookExample.openSaleBookExample,
      }),
    },
  })
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get()
  async findAll(@Req() req: any, @Query() query: FindManyBookQueryParamDto) {
    const userId = req.payload.id;

    const data = await this.service.getAllOpenSaleBook(userId, query);

    return BasePaginationResponse.ok({
      pagination: {
        limit: data.limit,
        page: data.page,
        total: data.count,
      },
      data: data.data,
    });
  }

  /**
   * This HTTP GET request is used for searching open sale book at book. The request requires a valid JWT token.
   *
   * Request
   *
   * The request query must contain the following fields:
   *
   * - search (string): The search query.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - pagination (object): An object containing pagination data.
   * - data (object): An array of open sale book data.
   *
   *
   */
  @ApiOkResponse({
    description: 'Successfully search open sale book',
    schema: {
      example: BasePaginationResponse.ok({
        pagination: BookExample.paginationExample,
        data: BookExample.openSaleBookExample,
      }),
    },
  })
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get('search')
  async searchOpenSaleBook(
    @Req() req: any,
    @Query() query: SearchBookQueryParamDto,
  ) {
    const userId = req.payload.id;

    const data = await this.service.searchOpenSaleBook(userId, query);

    return BasePaginationResponse.ok({
      pagination: {
        limit: data.limit,
        page: data.page,
        total: data.count,
      },
      data: data.data,
    });
  }

  /**
   * This HTTP GET request is used for retrieving a book by id at book. The request requires a valid JWT token.
   *
   * Request
   *
   * The request parameter must contain the following fields:
   *
   * - id (string): The book id.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): A book object data.
   *
   *
   */
  @ApiOkResponse({
    description: 'Successfully get book by id',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.postBookExample,
      }),
    },
  })
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') postId: string) {
    const userId = req.payload.id;

    const data = this.service.getPostBookById(userId, postId);

    return BaseResponse.ok({ data });
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Post('/predict')
  @ApiConsumes('multipart/form-data')
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type. Only image files are allowed.',
    schema: {
      example: BaseResponse.unsupportedMediaType(null),
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: ImageMultipart.imageUploadPath,
      filter: ImageMultipart.imageValidationMultipartFilter,
    }),
  )
  async predictImage(
    @UploadedFile() file: MemoryStorageFile,
    @Body() body: PredictBookDto,
  ) {
    const data = await this.service.predictBook(body, file);

    return BaseResponse.created({ data });
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Post()
  create(@Req() req: any, @Body() createBookDto: CreateBookDto) {
    const userId = req.payload.id;

    // TODO: Implement the create method
  }

  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @Get('author')
  findAllByAuthor(@Req() req: any, @Query() query: FindManyBookQueryParamDto) {
    const userId = req.payload.id;

    // TODO: Implement the findAllByAuthor method
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
