import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UploadHandlerService } from '../service/upload-handler.service';

@Module({
  imports: [HttpModule],
  providers: [UploadHandlerService],
  exports: [UploadHandlerService],
})
export class UploadHandlerModule {}
