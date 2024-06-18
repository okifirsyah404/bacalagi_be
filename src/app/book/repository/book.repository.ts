import { Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
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

  async getUserById(id: string) {
    return this.database.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findManyOpenSaleBook(paginationArgs: { page?: number; size?: number }) {
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

    return {
      count: count,
      skip: skip,
      limit: limit,
      page: page,
      data: data,
    };
  }

  async findManyBookBySearchTitle(paginationArgs: {
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

    return {
      count: count,
      skip: skip,
      limit: limit,
      page: page,
      data: data,
    };
  }

  async findPostBookById(id: string) {
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
}
