import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { PostSchema } from './entities/post.entity';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, { provide: 'PostModel', useValue: PostSchema }],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
