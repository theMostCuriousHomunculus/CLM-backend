import { model, Schema, Types } from 'mongoose';

interface Comment {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  body: string;
  comments: Comment[];
  createdAt: Date;
  image: string;
  subtitle: string;
  title: string;
  updatedAt: Date;
}

const commentSchema = new Schema<Comment>(
  {
    author: {
      type: Types.ObjectId,
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
    type: Types.ObjectId,
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

const BlogPostModel = model<BlogPost>('Blog', blogPostSchema);

const CommentModel = model<Comment>('Comment', commentSchema);

export { BlogPostModel as default, BlogPost, CommentModel };
