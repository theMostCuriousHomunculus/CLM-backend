import mongoose from 'mongoose';

import MessageSchema from '../schemas/message.js';
import Event from '../../types/interfaces/Event';
import EventPlayerSchema from '../schemas/event-player.js';

const { model, Schema } = mongoose;

const EventSchema = new Schema<Event>(
  {
    chat_log: [MessageSchema],
    cube: {
      ref: 'CubeModel',
      required: true,
      type: 'ObjectId'
    },
    finished: {
      default: false,
      required: true,
      type: Boolean
    },
    host: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    name: {
      required: true,
      trim: true,
      type: String
    },
    players: [EventPlayerSchema]
  },
  {
    timestamps: true
  }
);

EventSchema.index({ name: 'text' });

const EventModel = model<Event>('Event', EventSchema);

export default EventModel;
