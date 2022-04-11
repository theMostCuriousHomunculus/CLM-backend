import mongoose from 'mongoose';

import Deck from '../../types/interfaces/Deck';
import DeckCardSchema from '../schemas/deck-card.js';

const { model, Schema } = mongoose;

const DeckSchema = new Schema<Deck>({
  cards: [DeckCardSchema],
  creator: {
    ref: 'AccountModel',
    required: true,
    type: 'ObjectId'
  },
  description: {
    default: '',
    index: {
      collation: { locale: 'en', strength: 2 }
    },
    type: String
  },
  format: {
    default: 'Freeform',
    enum: [
      'Classy',
      'Freeform',
      'Legacy',
      'Modern',
      'Pauper',
      'Pioneer',
      'Standard',
      'Vintage'
    ],
    type: String
  },
  image: {
    ref: 'ScryfallCardModel',
    type: String
  },
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    maxlength: 64,
    required: true,
    trim: true,
    type: String
  },
  published: {
    default: true,
    type: Boolean
  }
});

DeckSchema.index({ name: 'text', description: 'text' });

const DeckModel = model<Deck>('Deck', DeckSchema);

export default DeckModel;
