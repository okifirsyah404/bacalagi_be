import { Injectable } from '@nestjs/common';
import { BookCondition, TransactionStatus } from '@prisma/client';
import { DatabaseProvider } from 'src/data/database/provider/database.provider';
import DatabaseSelector from 'src/data/selector/database.selector';
import { BasePaginationResponse } from 'src/utils/base/response.base';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';

@Injectable()
export class BookRepository {
  constructor(
    private readonly database: DatabaseProvider,
    private readonly logger: MainLogger,
  ) {}

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A Promise that resolves to the user object if found, or null if not found.
   */
  async getUserById(id: string) {
    return this.database.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * Finds a book by its ID.
   * @param id - The ID of the book to find.
   * @returns A Promise that resolves to the found book with associated transaction post, user, and prediction results.
   */
  async findOne(id: string) {
    return this.database.transactionPost.findUnique({
      where: {
        id,
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });
  }

  /**
   * Retrieves a paginated list of open sale products.
   *
   * @param paginationArgs - The pagination arguments.
   * @param paginationArgs.page - The page number.
   * @param paginationArgs.size - The number of items per page.
   * @returns An object containing the count, skip, limit, page, and data of the open sale products.
   */
  async findManyOpenSaleProduct(paginationArgs: {
    page?: number;
    size?: number;
  }) {
    const limit = paginationArgs.size ?? BasePaginationResponse.limit;
    const page = paginationArgs.page ?? 1;
    const skip = (page - 1) * limit;

    const count = await this.database.transactionPost.count({
      where: {
        status: TransactionStatus.OPEN,
      },
    });

    const data = await this.database.transactionPost.findMany({
      where: {
        status: TransactionStatus.OPEN,
      },
      skip: skip,
      take: limit,
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return {
      count: count,
      skip: skip,
      limit: limit,
      page: page,
      data: data,
    };
  }

  /**
   * Retrieves multiple products based on search title, with pagination support.
   * @param paginationArgs - The pagination arguments.
   * @param paginationArgs.title - The search title.
   * @param paginationArgs.page - The page number.
   * @param paginationArgs.size - The number of items per page.
   * @returns An object containing the count, skip, limit, page, and data of the retrieved products.
   */
  async findManyProductBySearchTitle(paginationArgs: {
    title?: string;
    page?: number;
    size?: number;
  }) {
    const limit = paginationArgs.size ?? BasePaginationResponse.limit;
    const page = paginationArgs.page ?? 1;
    const skip = (page - 1) * limit;

    const count = await this.database.transactionPost.count({
      where: {
        status: TransactionStatus.OPEN,
        book: {
          title: {
            contains: paginationArgs.title,
          },
        },
      },
    });

    const data = await this.database.transactionPost.findMany({
      where: {
        status: TransactionStatus.OPEN,
        book: {
          title: {
            contains: paginationArgs.title,
          },
        },
      },
      skip: skip,
      take: limit,
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return {
      count: count,
      skip: skip,
      limit: limit,
      page: page,
      data: data,
    };
  }

  /**
   * Finds a post book by its ID.
   * @param id - The ID of the post book to find.
   * @returns A Promise that resolves to the found post book.
   */
  async findProductById(id: string) {
    const data = await this.database.transactionPost.findUnique({
      where: {
        id: id,
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  /**
   * Increments the seen count of a book by 1.
   * @param id - The ID of the book.
   */
  async incrementSeenCount(id: string) {
    await this.database.transactionPost.update({
      where: {
        id: id,
      },
      data: {
        seenCount: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Retrieves multiple post books by author ID with pagination.
   *
   * @param userId - The ID of the author.
   * @param paginationArgs - The pagination arguments (page and size).
   * @returns An object containing the count, skip, limit, page, and data of the retrieved post books.
   */
  async findManyProductByAuthorId(
    userId: string,
    paginationArgs: { page?: number; size?: number },
  ) {
    const limit = paginationArgs.size ?? BasePaginationResponse.limit;
    const page = paginationArgs.page ?? 1;
    const skip = (page - 1) * limit;

    const count = await this.database.transactionPost.count({
      where: {
        user: {
          id: userId,
        },
      },
    });

    const data = await this.database.transactionPost.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      skip: skip,
      take: limit,
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return {
      count: count,
      skip: skip,
      limit: limit,
      page: page,
      data: data,
    };
  }

  /**
   * Finds a post book by author ID and post ID.
   * @param userId - The ID of the author.
   * @param productId - The ID of the post.
   * @returns A Promise that resolves to the found post book.
   */
  async findOneProductByAuthorId(userId: string, productId: string) {
    const data = await this.database.transactionPost.findFirst({
      where: {
        user: {
          id: userId,
        },
        id: productId,
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  /**
   * Creates a transaction post with the provided data.
   * @param userId - The ID of the user creating the transaction post.
   * @param bookData - The data of the book being listed for sale.
   * @param bookPredictionData - The prediction data for the book's condition and pricing.
   * @param postData - The additional data for the transaction post.
   * @returns The created transaction post data, including the book and user details.
   */
  async createProduct(
    userId: string,
    bookData: {
      title: string;
      author: string;
      ISBN: string;
      publisher: string;
      publishYear: number;
      language: string;
      buyPrice: number;
    },
    bookPredictionData: {
      bookCondition: BookCondition;
      buyPrice: number;
      outputPrice: number;
      percentage: number;
      overallRatio: number;
      rippedRatio: number;
      wornOutRatio: number;
    },
    postData: {
      recommendedPrice: number;
      finalPrice: number;
      description: string;
    },
  ) {
    const data = await this.database.transactionPost.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        recommendedPrice: postData.recommendedPrice,
        finalPrice: postData.finalPrice,
        description: postData.description,
        book: {
          create: {
            title: bookData.title,
            author: bookData.author,
            ISBN: bookData.ISBN,
            publisher: bookData.publisher,
            publishYear: bookData.publishYear,
            language: bookData.language,
            buyPrice: bookData.buyPrice,
            imageUrl: '',
            predictionResults: {
              create: {
                bookCondition: bookPredictionData.bookCondition,
                buyPrice: bookPredictionData.buyPrice,
                outputPrice: bookPredictionData.outputPrice,
                percentage: bookPredictionData.percentage,
                overallRatio: bookPredictionData.overallRatio,
                rippedRatio: bookPredictionData.rippedRatio,
                wornOutRatio: bookPredictionData.wornOutRatio,
              },
            },
          },
        },
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  /**
   * Updates the transaction post image URL for a given ID.
   * @param id - The ID of the transaction post.
   * @param imageUrl - The new image URL to be updated.
   * @returns The updated data after the image URL is updated.
   */
  async updateProductImage(id: string, imageUrl: string) {
    const data = await this.database.transactionPost.update({
      where: {
        id: id,
      },
      data: {
        book: {
          update: {
            imageUrl: imageUrl,
          },
        },
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  /**
   * Sets the status of a transaction post.
   *
   * @param userId - The ID of the user who owns the transaction post.
   * @param postid - The ID of the transaction post.
   * @param status - The new status to set for the transaction post.
   * @returns The updated transaction post data.
   */
  async setProductStatus(
    userId: string,
    postid: string,
    status: TransactionStatus,
  ) {
    const data = await this.database.transactionPost.update({
      where: {
        id: postid,
        userId: userId,
      },
      data: {
        status: status,
      },
      select: {
        ...DatabaseSelector.transactionPost,
        book: {
          select: {
            ...DatabaseSelector.book,
            predictionResults: {
              select: DatabaseSelector.predictionResult,
            },
          },
        },
        user: {
          select: DatabaseSelector.user,
        },
      },
    });

    return data;
  }

  /**
   * Updates a product in the database.
   *
   * @param userId - The ID of the user who owns the product.
   * @param productId - The ID of the product to be updated.
   * @param postData - The updated data for the product.
   * @returns The updated product data.
   */
  async updateProduct(
    userId: string,
    productId: string,
    postData: {
      recommendedPrice: number;
      finalPrice: number;
      description: string;
    },
  ) {
    const data = await this.database.transactionPost.update({
      where: {
        userId: userId,
        id: productId,
      },
      data: {
        recommendedPrice: postData.recommendedPrice,
        finalPrice: postData.finalPrice,
        description: postData.description,
      },
      select: DatabaseSelector.transactionPost,
    });

    return data;
  }

  /**
   * Updates a book by its ID.
   * @param id - The ID of the book to update.
   * @param bookData - The updated book data.
   * @returns The updated book data.
   */
  async updateBookById(
    id: string,
    bookData: {
      title: string;
      author: string;
      ISBN: string;
      publisher: string;
      publishYear: number;
      language: string;
      buyPrice: number;
    },
  ) {
    const data = await this.database.book.update({
      where: {
        id: id,
      },
      data: {
        title: bookData.title,
        author: bookData.author,
        ISBN: bookData.ISBN,
        publisher: bookData.publisher,
        publishYear: bookData.publishYear,
        language: bookData.language,
        buyPrice: bookData.buyPrice,
      },
      select: DatabaseSelector.book,
    });

    return data;
  }

  /**
   * Updates the prediction result for a book based on its ID.
   * @param bookId - The ID of the book.
   * @param bookPredictionData - The updated prediction data for the book.
   * @returns The updated prediction result.
   */
  async updatePredictionResultByBookId(
    bookId: string,
    bookPredictionData: {
      bookCondition: BookCondition;
      buyPrice: number;
      outputPrice: number;
      percentage: number;
      overallRatio: number;
      rippedRatio: number;
      wornOutRatio: number;
    },
  ) {
    const data = await this.database.predictionResult.update({
      where: {
        bookId: bookId,
      },
      data: {
        bookCondition: bookPredictionData.bookCondition,
        buyPrice: bookPredictionData.buyPrice,
        outputPrice: bookPredictionData.outputPrice,
        percentage: bookPredictionData.percentage,
        overallRatio: bookPredictionData.overallRatio,
        rippedRatio: bookPredictionData.rippedRatio,
        wornOutRatio: bookPredictionData.wornOutRatio,
      },
      select: DatabaseSelector.predictionResult,
    });

    return data;
  }

  /**
   * Deletes a product from the database.
   *
   * @param {string} userId - The ID of the user who owns the product.
   * @param {string} productId - The ID of the product to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the product is deleted.
   */
  async deleteProduct(userId: string, productId: string) {
    return await this.database.transactionPost.delete({
      where: {
        userId: userId,
        id: productId,
      },
    });
  }

  /**
   * Deletes a book from the database by its ID.
   * @param id - The ID of the book to delete.
   * @returns A promise that resolves to the deleted book.
   */
  async deleteBookById(id: string) {
    return await this.database.book.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Deletes the prediction result for a book based on the book ID.
   * @param {string} bookId - The ID of the book.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  async deletePredictionResultByBookId(bookId: string) {
    return await this.database.predictionResult.delete({
      where: {
        bookId: bookId,
      },
    });
  }
}
