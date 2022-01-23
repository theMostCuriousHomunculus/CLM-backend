import mongoose from 'mongoose';

import Message from './Message';

export default interface BlogPost extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  body: string;
  comments: mongoose.Types.DocumentArray<Message>;
  createdAt: Date;
  image: string;
  subtitle: string;
  title: string;
  updatedAt: Date;
}
