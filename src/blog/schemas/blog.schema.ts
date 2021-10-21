import { Schema } from 'mongoose';

export const BlogSchema = new Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
