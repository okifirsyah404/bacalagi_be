import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify';
import {
  Body,
  Controller,
  Delete,
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
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
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
import { CreateBookExampleDto } from '../dto/create-book-example.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindManyBookQueryParamDto } from '../dto/find-many-book-query-param.dto';
import { PredictBookExampleDto } from '../dto/predict-book-example.dto';
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
    example: BaseResponse.unauthorized({}),
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

    const data = await this.service.getAllOpenSaleProduct(userId, query);

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
  @Get('search/paging')
  async searchOpenSaleBook(
    @Req() req: any,
    @Query() query: SearchBookQueryParamDto,
  ) {
    const userId = req.payload.id;

    const data = await this.service.searchOpenSaleProduct(userId, query);

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
   * This HTTP GET request is used for searching open sale book without paging at book. The request requires a valid JWT token.
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
   * - data (object): An array of open sale book data.
   *
   *
   */
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @ApiOkResponse({
    description: 'Successfully search open sale book',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.openSaleBookExample,
      }),
    },
  })
  @Get('search')
  async searchOpenSaleBookWithoutPaging(
    @Req() req: any,
    @Query('q') title: string,
  ) {
    const userId = req.payload.id;

    const data = await this.service.searchOpenProduct(userId, title);

    return BaseResponse.ok({ data });
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
        data: BookExample.productExample,
      }),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: BaseResponse.notFound({}, 'Product not found'),
    },
  })
  @ApiTags(SwaggerTag.BOOK_BY_OTHER_USER)
  @Get(':id')
  async findOne(@Req() req: any, @Param('id') productId: string) {
    const userId = req.payload.id;

    const data = await this.service.getProductById(userId, productId);

    return BaseResponse.ok({ data });
  }

  /**
   *
   * This HTTP POST request is used for predicting a book by image at book. The request requires a valid JWT token.
   *
   * This uses multipart/form-data as the content type.
   *
   * Request
   * - File: The image file.
   * - Body: The prediction data.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): A prediction result data.
   *
   */
  @ApiTags(SwaggerTag.PREDICT_BOOK)
  @ApiBody({
    description: 'Book prediction data',
    type: PredictBookExampleDto,
  })
  @ApiCreatedResponse({
    description: 'Successfully predict book',
    schema: {
      example: BaseResponse.created({
        data: BookExample.predictionResultExample,
      }),
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type. Only image files are allowed.',
    schema: {
      example: BaseResponse.unsupportedMediaType({}),
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: ImageMultipart.imageUploadPath,
      filter: ImageMultipart.imageValidationMultipartFilter,
    }),
  )
  @Post('/predict')
  async predictImage(
    @UploadedFile() file: MemoryStorageFile,
    @Body() body: PredictBookDto,
  ) {
    const data = await this.service.predictBook(body, file);

    return BaseResponse.created({ data });
  }

  /**
   * This HTTP GET request is used for retrieving all book by author at book. The request requires a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - pagination (object): An object containing pagination data.
   * - data (object): An array of book data.
   *
   */
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiOkResponse({
    description: 'Successfully get all book by author',
    schema: {
      example: BasePaginationResponse.ok({
        pagination: BookExample.paginationExample,
        data: BookExample.openSaleBookExample,
      }),
    },
  })
  @Get('author/post/paging')
  async findAllByAuthor(
    @Req() req: any,
    @Query() query: FindManyBookQueryParamDto,
  ) {
    const userId = req.payload.id;

    const data = await this.service.getPostsBookAsAuthor(userId, query);

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
   * This HTTP GET request is used for retrieving all book by author without paging at book. The request requires a valid JWT token.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 200. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): An array of book data.
   *
   */
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiOkResponse({
    description: 'Successfully get all book by author',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.openSaleBookExample,
      }),
    },
  })
  @Get('author/post')
  async findAllByAuthorWithoutPaging(@Req() req: any) {
    const userId = req.payload.id;

    const data =
      await this.service.getPostsBookAsAuthorWithoutPagination(userId);

    return BaseResponse.ok({ data });
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
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiOkResponse({
    description: 'Successfully get book by id',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.productExample,
      }),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: BaseResponse.notFound({}, 'Product not found'),
    },
  })
  @Get('author/post/:id')
  async fionOneByAuthor(@Req() req: any, @Param('id') productId: string) {
    const userId = req.payload.id;

    const data = await this.service.getProductByIdAsAuthor(userId, productId);

    return BaseResponse.ok({ data });
  }

  /**
   *
   * This HTTP GET request is used for setting a book as sold by the author at book. The request requires a valid JWT token.
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
   */
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiOkResponse({
    description: 'Successfully get book by id',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.soldproductExample,
      }),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: BaseResponse.notFound({}, 'Product not found'),
    },
  })
  @Get('author/post/:id/sold-out')
  async setProductAsSoldByAuthor(
    @Req() req: any,
    @Param('id') productId: string,
  ) {
    const userId = req.payload.id;

    const data = await this.service.setProductAsSold(userId, productId);

    return BaseResponse.ok({ data });
  }

  /**
   * This HTTP POST request is used for creating a book at book. The request requires a valid JWT token.
   *
   * This uses multipart/form-data as the content type.
   *
   *
   * Request
   * - Body: Image file, book data, and prediction result.
   *
   * Response
   *
   * Upon successful execution, the response will have a status code of 201. The response body will contain the following fields:
   *
   * - status (string): Indicates the status of the http method process.
   * - statusCode (number): The status code of the response.
   * - message (string): A message indicating the response status.
   * - data (object): A book object data.
   *
   */
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book data and image file',
    type: CreateBookExampleDto,
  })
  @ApiCreatedResponse({
    description: 'Successfully create book',
    schema: {
      example: BaseResponse.created({
        data: BookExample.productExample,
      }),
    },
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type. Only image files are allowed.',
    schema: {
      example: BaseResponse.unsupportedMediaType({}),
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: ImageMultipart.imageUploadPath,
      filter: ImageMultipart.imageValidationMultipartFilter,
    }),
  )
  @Post('author/post')
  async create(
    @Req() req: any,
    @UploadedFile() file: MemoryStorageFile,
    @Body() createBookDto: CreateBookDto,
  ) {
    const userId = req.payload.id;

    const data = await this.service.createProduct(userId, createBookDto, file);

    return BaseResponse.created({ data });
  }

  /**
   *
   * This HTTP PUT request is used for updating a book at book. The request requires a valid JWT token.
   *
   * This uses multipart/form-data as the content type.
   *
   * Request
   * - Body: Image file and book data.
   * - Param: The book id.
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
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book data and image file',
    type: CreateBookExampleDto,
  })
  @ApiOkResponse({
    description: 'Successfully edit book',
    schema: {
      example: BaseResponse.ok({
        data: BookExample.productExample,
      }),
    },
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'Unsupported media type. Only image files are allowed.',
    schema: {
      example: BaseResponse.unsupportedMediaType({}),
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      dest: ImageMultipart.imageUploadPath,
      filter: ImageMultipart.imageValidationMultipartFilter,
    }),
  )
  @Put('author/post/:id')
  async update(
    @Req() req: any,
    @Param('id') productId: string,
    @UploadedFile() file: MemoryStorageFile,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const userId = req.payload.id;

    const data = await this.service.updateProduct(
      userId,
      productId,
      updateBookDto,
      file,
    );

    return BaseResponse.ok({ data });
  }

  /**
   * This HTTP DELETE request is used for deleting a book at book. The request requires a valid JWT token.
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
   *
   */
  @ApiTags(SwaggerTag.BOOK_BY_POST_AUTHOR)
  @ApiOkResponse({
    description: 'Successfully delete book',
    schema: {
      example: BaseResponse.ok({}),
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      example: BaseResponse.notFound({}, 'Product not found'),
    },
  })
  @Delete('author/post/:id')
  async remove(@Req() req: any, @Param('id') productId: string) {
    const userId = req.payload.id;

    await this.service.deleteProduct(userId, productId);

    return BaseResponse.ok({});
  }
}
