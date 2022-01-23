import mongoose from 'mongoose';

import Message from '../../types/interfaces/Message';

const MessageSchema = new mongoose.Schema<Message>(
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

export default MessageSchema;
