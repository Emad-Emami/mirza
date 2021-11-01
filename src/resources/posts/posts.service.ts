import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await new this.postModel(createPostDto);
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async findOne(id: ObjectId): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    return post;
  }

  async update(id: ObjectId, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
    return post;
  }

  async remove(id: ObjectId): Promise<Post> {
    const post = await this.postModel.findByIdAndDelete(id);
    return post;
  }
}
