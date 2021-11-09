import { model, Schema } from 'mongoose';

import { deckCardSchema } from './deck-model.js';
import Event from '../types/interfaces/Event';
import EventPlayer from '../types/interfaces/EventPlayer';

const playerSchema = new Schema<EventPlayer>(
  {
    account: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    mainboard: [deckCardSchema],
    packs: [[deckCardSchema]],
    queue: [[deckCardSchema]],
    sideboard: [deckCardSchema]
  },
  {
    _id: false
  }
);

const eventSchema = new Schema<Event>(
  {
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
    players: [playerSchema]
  },
  {
    timestamps: true
  }
);

const EventModel = model<Event>('Event', eventSchema);

export default EventModel;
