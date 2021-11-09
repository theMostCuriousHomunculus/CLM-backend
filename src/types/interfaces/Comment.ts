import { Types } from 'mongoose';

export default interface Comment {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
