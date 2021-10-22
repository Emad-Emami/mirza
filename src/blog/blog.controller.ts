import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { POINT_CONVERSION_HYBRID } from 'constants';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }

  @Get('/post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }

  @Get('/posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Put('/post/:postID')
  async editPost(
    @Res() res,
    @Param('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated!',
      post: editedPost,
    });
  }

  @Delete('/post/:postID')
  async deletePost(
    @Res() res,
    @Param('postID', new ValidateObjectId()) postID,
  ) {
    const deleted = await this.blogService.deletePost(postID);
    if (!deleted) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
