import mongoose from 'mongoose';

import BlogPost from '../types/interfaces/BlogPost';
import Comment from '../types/interfaces/Comment';

const { model, Schema } = mongoose;

const commentSchema = new Schema<Comment>(
  {
    author: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    body: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

const blogPostSchema = new Schema<BlogPost>({
  author: {
    type: 'ObjectId',
    ref: 'AccountModel',
    required: true
  },
  body: {
    required: true,
    type: String
  },
  comments: [commentSchema],
  createdAt: Date,
  image: {
    required: true,
    type: String
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

blogPostSchema.index({ title: 'text', subtitle: 'text' });

const BlogPostModel = model<BlogPost>('BlogPost', blogPostSchema);

const CommentModel = model<Comment>('Comment', commentSchema);

export { BlogPostModel as default, CommentModel };
