import { Document, Types } from 'mongoose';

import Comment from './Comment';

export default interface BlogPost extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  body: string;
  comments: Types.DocumentArray<Comment>;
  createdAt: Date;
  image: string;
  subtitle: string;
  title: string;
  updatedAt: Date;
}
