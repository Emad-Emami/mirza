import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { AuthenticationMiddleware } from '../../middlewares/authentication';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/posts' },
        { method: RequestMethod.PATCH, path: '/posts/:id' },
        { method: RequestMethod.DELETE, path: '/posts/:id' },
      );
  }
}
