import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  date_posted: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
