import { Module } from '@nestjs/common';
import { BookController } from '../controller/book.controller';
import { BookService } from '../service/book.service';
import { HttpModule } from '@nestjs/axios';
import { UploadHandlerService } from 'src/services/upload-handler/service/upload-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService, UploadHandlerService],
})
export class BookModule {}
