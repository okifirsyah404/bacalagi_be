import { Module } from '@nestjs/common';
import { BookController } from '../controller/book.controller';
import { BookService } from '../service/book.service';
import { HttpHandlerModule } from 'src/services/http-handler/module/http-handler.module';
import { BookRepository } from '../repository/book.repository';

@Module({
  imports: [HttpHandlerModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
