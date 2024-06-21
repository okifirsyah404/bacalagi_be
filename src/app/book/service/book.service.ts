import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { HttpHandlerService } from 'src/services/http-handler/service/http-handler.service';
import { UploadHandlerService } from 'src/services/upload-handler/service/upload-handler.service';
import { PostHelper } from 'src/utils/helpers/post/post-helper';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { CreateBookDto } from '../dto/create-book.dto';
import { FindManyBookQueryParamDto } from '../dto/find-many-book-query-param.dto';
import { PredictBookDto } from '../dto/predict-book.dto';
import { SearchBookQueryParamDto } from '../dto/search-book-query-param.dto';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly logger: MainLogger,
    private readonly repository: BookRepository,
    private readonly httpHandler: HttpHandlerService,
    private readonly uploadHandlerService: UploadHandlerService,
  ) {}

  /**
   * Predicts the book based on the provided data and file.
   * @param data - The data for predicting the book.
   * @param file - The file containing the book image.
   * @returns A promise that resolves to the predicted book result.
   * @throws {InternalServerErrorException} If there is an error during prediction.
   */
  async predictBook(data: PredictBookDto, file: any) {
    const predictResult = await this.httpHandler
      .sendDataToModel({
        imagePath: file.path,
        purchasePrice: data.buyPrice,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const bookCondition = PostHelper.checkProductCondition(
      predictResult.overallRatio,
    );

    const percentage = PostHelper.roundRatioToInteger(
      predictResult.overallRatio,
    );

    return {
      id: '',
      bookCondition: bookCondition,
      buyPrice: data.buyPrice,
      outputPrice: predictResult.recommendedPrice,
      percentage: percentage,
      rippedRatio: predictResult.rippedRatio,
      wornOutRatio: predictResult.wornOutRatio,
      overallRatio: predictResult.overallRatio,
    };
  }

  /**
   * Retrieves all open sale books based on the provided user ID and query parameters.
   *
   * @param userId - The ID of the user.
   * @param dto - The query parameters for filtering the books.
   * @returns A promise that resolves to the array of open sale books.
   * @throws {InternalServerErrorException} If there is an error retrieving the user or the books.
   * @throws {UnauthorizedException} If the user is not found.
   */
  async getAllOpenSaleProduct(userId: string, dto: FindManyBookQueryParamDto) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findManyOpenSaleProduct({
        page: dto.page,
        size: dto.size,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  /**
   * Searches for open sale books based on the provided search criteria.
   *
   * @param userId - The ID of the user performing the search.
   * @param dto - The search criteria.
   * @returns A Promise that resolves to the search results.
   * @throws {InternalServerErrorException} If there is an error while retrieving the user or the books.
   * @throws {UnauthorizedException} If the user is not found.
   */
  async searchOpenSaleProduct(userId: string, dto: SearchBookQueryParamDto) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findManyProductBySearchTitle({
        page: dto.page,
        size: dto.size,
        title: dto.title,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  /**
   * Searches for open products based on the given search query.
   *
   * @param userId - The ID of the user performing the search.
   * @param searchQuery - The search query to match against product titles.
   * @returns A Promise that resolves to the search results.
   * @throws InternalServerErrorException if there is an error retrieving the user or searching for products.
   * @throws UnauthorizedException if the user is not found.
   */
  async searchOpenProduct(userId: string, searchQuery: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .searchProductByTitle(searchQuery)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  /**
  * Retrieves a post book by its ID for a specific user.
  * 
  * @param userId - The ID of the user.
    @param productId - The ID of the post book.
   *@returns A Promise that resolves to the retrieved post book.
   * throws {InternalServerErrorException} If there is an error retrieving the user, incrementing the seen count, or finding the post book.
   * @throws {UnauthorizedException} If the user is not found.
   * @throws {UnauthorizedException} If retrieving the post book fails.
   * @throws {NotFoundException} If the post book is not found.
   */
  async getProductById(userId: string, productId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const postedBook = await this.repository
      .findOne(productId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    if (!postedBook) {
      throw new NotFoundException('Product not found');
    }

    await this.repository.incrementSeenCount(productId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    const data = await this.repository
      .findProductById(productId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return data;
  }

  /**
   * Retrieves a list of posts for a specific user as an author.
   *
   * @param userId - The ID of the user.
   * @param dto - The query parameters for filtering the posts.
   * @returns A Promise that resolves to the list of posts.
   * @throws InternalServerErrorException if there is an error retrieving the user or posts.
   * @throws UnauthorizedException if the user is not found.
   */
  async getPostsBookAsAuthor(userId: string, dto: FindManyBookQueryParamDto) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findManyProductByAuthorId(userId, {
        page: dto.page,
        size: dto.size,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  async getPostsBookAsAuthorWithoutPagination(userId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findManyProductByAuthor(userId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  /**
   * Retrieves a post book by its ID as an author.
   *
   * @param userId - The ID of the user.
   * @param productId - The ID of the post book.
   * @returns The post book data.
   * @throws InternalServerErrorException if there is an error retrieving the user or post book.
   * @throws UnauthorizedException if the user is not found.
   * @throws NotFoundException if the post book is not found.
   */
  async getProductByIdAsAuthor(userId: string, productId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findOneProductByAuthorId(userId, productId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return data;
  }

  /**
   * Creates a new post for a book.
   *
   * @param userId - The ID of the user creating the post.
   * @param data - The data for the book post.
   * @param file - The file associated with the book post.
   * @returns The updated image post.
   * @throws {InternalServerErrorException} If there is an internal server error.
   * @throws {UnauthorizedException} If the user is not found.
   */
  async createProduct(userId: string, data: CreateBookDto, file: any) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const predictResult = await this.httpHandler
      .sendDataToModel({
        imagePath: file.path,
        purchasePrice: data.buyPrice,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const bookCondition = PostHelper.checkProductCondition(
      predictResult.overallRatio,
    );

    const percentage = PostHelper.roundRatioToInteger(
      predictResult.overallRatio,
    );

    const createdPost = await this.repository
      .createProduct(
        userId,
        {
          author: data.author,
          buyPrice: data.buyPrice,
          ISBN: data.ISBN,
          language: data.language,
          publisher: data.publisher,
          publishYear: data.publishYear,
          title: data.title,
        },
        {
          bookCondition: bookCondition,
          buyPrice: data.buyPrice,
          outputPrice: predictResult.recommendedPrice,
          overallRatio: predictResult.overallRatio,
          percentage: percentage,
          rippedRatio: predictResult.rippedRatio,
          wornOutRatio: predictResult.wornOutRatio,
        },
        {
          description: data.description,
          finalPrice: predictResult.recommendedPrice,
          recommendedPrice: predictResult.recommendedPrice,
        },
      )
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const filePath = await this.uploadHandlerService
      .uploadPostImage(createdPost.id, file.path)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const updatedImagePost = await this.repository.updateProductImage(
      createdPost.id,
      filePath,
    );

    return updatedImagePost;
  }

  /**
   * Sets a post book as sold for a specific user.
   *
   * @param userId - The ID of the user.
   * @param productId - The ID of the post book.
   * @returns A Promise that resolves to the updated data.
   * @throws InternalServerErrorException if there is an error retrieving the user or setting the transaction status.
   * @throws UnauthorizedException if the user is not found.
   */
  async setProductAsSold(userId: string, productId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .setProductStatus(userId, productId, TransactionStatus.SOLD)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  /**
   * Updates a product with the provided information.
   *
   * @param userId - The ID of the user who owns the product.
   * @param productId - The ID of the product to be updated.
   * @param dto - The data transfer object containing the updated product information.
   * @param file - The file associated with the product.
   * @returns The updated product with the updated image.
   * @throws InternalServerErrorException if there is an internal server error.
   * @throws UnauthorizedException if the user is not authorized.
   * @throws NotFoundException if the product is not found.
   */
  async updateProduct(
    userId: string,
    productId: string,
    dto: CreateBookDto,
    file: any,
  ) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const prevProduct = await this.repository
      .findOne(productId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    if (!prevProduct) {
      throw new NotFoundException('Product not found');
    }

    const predictResult = await this.httpHandler
      .sendDataToModel({
        imagePath: file.path,
        purchasePrice: dto.buyPrice,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const bookCondition = PostHelper.checkProductCondition(
      predictResult.overallRatio,
    );

    const percentage = PostHelper.roundRatioToInteger(
      predictResult.overallRatio,
    );

    this.logger.debug('Prev product', prevProduct);

    await this.repository
      .updateBookById(prevProduct.book.id, {
        author: dto.author,
        title: dto.title,
        buyPrice: dto.buyPrice,
        ISBN: dto.ISBN,
        language: dto.language,
        publisher: dto.publisher,
        publishYear: dto.publishYear,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    await this.repository
      .updatePredictionResultByBookId(prevProduct.book.id, {
        bookCondition: bookCondition,
        buyPrice: dto.buyPrice,
        outputPrice: predictResult.recommendedPrice,
        overallRatio: predictResult.overallRatio,
        percentage: percentage,
        rippedRatio: predictResult.rippedRatio,
        wornOutRatio: predictResult.wornOutRatio,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    await this.repository
      .updateProduct(userId, productId, {
        description: dto.description,
        finalPrice: dto.finalPrice,
        recommendedPrice: predictResult.recommendedPrice,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const filePath = await this.uploadHandlerService
      .uploadPostImage(productId, file.path)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const updatedImagePost = await this.repository.updateProductImage(
      productId,
      filePath,
    );

    return updatedImagePost;
  }

  /**
   * Deletes a product by its ID for a specific user.
   *
   * @param userId - The ID of the user.
   * @param productId - The ID of the product to be deleted.
   * @returns An empty object.
   * @throws {InternalServerErrorException} If there is an internal server error.
   * @throws {UnauthorizedException} If the user is not found.
   * @throws {NotFoundException} If the product is not found.
   */
  async deleteProduct(userId: string, productId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const prevData = await this.repository.findOne(productId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!prevData) {
      throw new NotFoundException('Product not found');
    }

    await this.repository.deleteProduct(userId, productId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    await this.repository
      .deletePredictionResultByBookId(prevData.book.id)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    await this.repository.deleteBookById(prevData.book.id).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    return {};
  }
}
