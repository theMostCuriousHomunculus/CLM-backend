import mongoose from 'mongoose';

import DeckCardSchema from './deck-card.js';
import EventPlayer from '../../types/interfaces/EventPlayer';

const EventPlayerSchema = new mongoose.Schema<EventPlayer>(
  {
    account: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    mainboard: [DeckCardSchema],
    packs: [[DeckCardSchema]],
    queue: [[DeckCardSchema]],
    sideboard: [DeckCardSchema]
  },
  {
    _id: false
  }
);

export default EventPlayerSchema;
