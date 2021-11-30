import mongoose from 'mongoose';

import Comment from './Comment';

export default interface BlogPost extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  body: string;
  comments: mongoose.Types.DocumentArray<Comment>;
  createdAt: Date;
  image: string;
  subtitle: string;
  title: string;
  updatedAt: Date;
}
