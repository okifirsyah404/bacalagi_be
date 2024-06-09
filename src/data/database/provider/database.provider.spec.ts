import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseProvider } from './database.provider';

describe('DatabaseService', () => {
  let service: DatabaseProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseProvider],
    }).compile();

    service = module.get<DatabaseProvider>(DatabaseProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
