import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mirza', {
      useNewUrlParser: true,
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
