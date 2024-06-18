import { Module } from '@nestjs/common';
import { BookController } from '../controller/book.controller';
import { BookService } from '../service/book.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
