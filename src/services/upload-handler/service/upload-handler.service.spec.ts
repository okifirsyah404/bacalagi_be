import { Test, TestingModule } from '@nestjs/testing';
import { UploadHandlerService } from './upload-handler.service';

describe('UploadHandlerService', () => {
  let service: UploadHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadHandlerService],
    }).compile();

    service = module.get<UploadHandlerService>(UploadHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
