import mongoose from 'mongoose';

import Message from './Message';

export default interface Conversation extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  messages: mongoose.Types.DocumentArray<Message>;
  participants: mongoose.Types.Array<mongoose.Types.ObjectId>;
}
