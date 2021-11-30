import mongoose from 'mongoose';

export default interface Comment extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
