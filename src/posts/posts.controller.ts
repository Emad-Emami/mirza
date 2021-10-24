import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectId } from 'mongoose';
import { ValidateObjectId } from 'src/pipes/validate-object-id';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto);
    return post;
  }

  @Get()
  async findAll() {
    const posts = await this.postService.findAll();
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id', new ValidateObjectId()) id: ObjectId) {
    const post = await this.postService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }
    return post;
  }

  @Patch(':id')
  async update(
    @Param('id', new ValidateObjectId()) id: ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }
    return post;
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id', new ValidateObjectId()) id: ObjectId) {
    const post = await this.postService.remove(id);
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
