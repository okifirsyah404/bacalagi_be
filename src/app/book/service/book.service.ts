import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpHandlerService } from 'src/services/http-handler/service/http-handler.service';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
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
  ) {}

  async predictBook(data: PredictBookDto, file: any) {
    const predictResult = this.httpHandler
      .sendDataToModel({
        imagePath: file.path,
        purchasePrice: data.buyPrice,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    this.logger.log('Predict book data', predictResult);

    return predictResult;
  }

  async getAllOpenSaleBook(userId: string, dto: FindManyBookQueryParamDto) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findManyOpenSaleBook({
        page: dto.page,
        size: dto.size,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  async searchOpenSaleBook(userId: string, dto: SearchBookQueryParamDto) {
    // const user = await this.repository.getUserById(userId).catch((error) => {
    //   throw new InternalServerErrorException(error);
    // });

    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    const data = await this.repository
      .findManyBookBySearchTitle({
        page: dto.page,
        size: dto.size,
        title: dto.title,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }

  async getPostBookById(userId: string, postBookId: string) {
    const user = await this.repository.getUserById(userId).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.repository
      .findPostBookById(postBookId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    return data;
  }
}
