import mongoose from 'mongoose';

import Comment from '../../types/interfaces/Comment';

const CommentSchema = new mongoose.Schema<Comment>(
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

export default CommentSchema;
