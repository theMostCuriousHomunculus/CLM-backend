import { model, Schema, Types } from 'mongoose';

import { DeckCard, deckCardSchema } from './deck-model.js';

interface Player {
  account: Types.ObjectId;
  mainboard: DeckCard[];
  packs: DeckCard[][];
  queue: DeckCard[][];
  sideboard: DeckCard[];
}

interface Event {
  _id: Types.ObjectId;
  createdAt: Date;
  cube: Types.ObjectId;
  finished: boolean;
  host: Types.ObjectId;
  name: string;
  players: Player[];
  updatedAt: Date;
}

const playerSchema = new Schema<Player>(
  {
    account: {
      type: Types.ObjectId,
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
      type: Types.ObjectId
    },
    finished: {
      default: false,
      required: true,
      type: Boolean
    },
    host: {
      type: Types.ObjectId,
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

export { EventModel as default, Event, Player };
