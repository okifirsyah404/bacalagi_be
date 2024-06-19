import { Module } from '@nestjs/common';
import { HttpHandlerModule } from 'src/services/http-handler/module/http-handler.module';
import { UploadHandlerModule } from 'src/services/upload-handler/module/upload-handler.module';
import { BookController } from '../controller/book.controller';
import { BookRepository } from '../repository/book.repository';
import { BookService } from '../service/book.service';

@Module({
  imports: [HttpHandlerModule, UploadHandlerModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
