import { Types } from 'mongoose';

export default interface Comment extends Types.Subdocument {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
