import mongoose from 'mongoose';

import BlogPost from '../../types/interfaces/BlogPost';
import MessageSchema from '../schemas/message.js';

const { model, Schema } = mongoose;

const BlogPostSchema = new Schema<BlogPost>({
  author: {
    type: 'ObjectId',
    ref: 'AccountModel',
    required: true
  },
  body: {
    required: true,
    type: String
  },
  comments: [MessageSchema],
  createdAt: Date,
  image: {
    required: true,
    type: String
  },
  published: {
    default: false,
    type: Boolean
  },
  subtitle: {
    maxlength: 100,
    trim: true,
    type: String
  },
  title: {
    maxlength: 100,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  updatedAt: Date
});

BlogPostSchema.index({ title: 'text', subtitle: 'text' });

const BlogPostModel = model<BlogPost>('Blog', BlogPostSchema);

export default BlogPostModel;
