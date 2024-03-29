import { Test, TestingModule } from '@nestjs/testing';
import { PostSchema } from './entities/post.entity';
import { PostService } from './posts.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, { provide: 'PostModel', useValue: PostSchema }],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
