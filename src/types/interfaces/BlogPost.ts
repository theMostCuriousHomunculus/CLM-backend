import { Types } from 'mongoose';

import Comment from './Comment';

export default interface BlogPost {
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
