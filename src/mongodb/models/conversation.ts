import mongoose from 'mongoose';

import MessageSchema from '../schemas/message.js';
import Conversation from '../../types/interfaces/Conversation';

const { model, Schema } = mongoose;

const ConversationSchema = new Schema<Conversation>({
  messages: [MessageSchema],
  participants: [
    {
      ref: 'AccountModel',
      required: true,
      type: 'ObjectId'
    }
  ]
});

const ConversationModel = model<Conversation>(
  'Conversation',
  ConversationSchema
);

export default ConversationModel;
