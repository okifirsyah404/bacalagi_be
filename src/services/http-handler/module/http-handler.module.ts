import { Module } from '@nestjs/common';
import { HttpHandlerService } from '../service/http-handler.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpHandlerService],
  exports: [HttpHandlerService],
})
export class HttpHandlerModule {}
