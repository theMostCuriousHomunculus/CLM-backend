import mongoose from 'mongoose';

import EventPlayer from './EventPlayer';

export default interface Event {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  cube: mongoose.Types.ObjectId;
  finished: boolean;
  host: mongoose.Types.ObjectId;
  name: string;
  players: mongoose.Types.DocumentArray<EventPlayer>;
  updatedAt: Date;
}
