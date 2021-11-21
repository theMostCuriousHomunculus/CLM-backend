import { Types } from 'mongoose';

import EventPlayer from './EventPlayer';

export default interface Event {
  _id: Types.ObjectId;
  createdAt: Date;
  cube: Types.ObjectId;
  finished: boolean;
  host: Types.ObjectId;
  name: string;
  players: Types.DocumentArray<EventPlayer>;
  updatedAt: Date;
}
