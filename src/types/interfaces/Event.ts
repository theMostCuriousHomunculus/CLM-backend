import mongoose from 'mongoose';

import Message from './Message';
import EventPlayer from './EventPlayer';

export default interface Event extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  chat_log: mongoose.Types.DocumentArray<Message>;
  createdAt: Date;
  cube: mongoose.Types.ObjectId;
  finished: boolean;
  host: mongoose.Types.ObjectId;
  name: string;
  players: mongoose.Types.DocumentArray<EventPlayer>;
  updatedAt: Date;
}
