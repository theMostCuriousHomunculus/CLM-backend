import mongoose from 'mongoose';

import Deck from '../types/interfaces/Deck';
import DeckCard from '../types/interfaces/DeckCard';

const { model, Schema } = mongoose;

const deckCardSchema = new Schema<DeckCard>({
  name: {
    required: true,
    type: String
  },
  scryfall_id: {
    required: true,
    type: String
  }
});

const deckSchema = new Schema<Deck>({
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
  image: String,
  mainboard: [deckCardSchema],
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
  },
  sideboard: [deckCardSchema]
});

deckSchema.index({ name: 'text', description: 'text' });

const DeckModel = model<Deck>('Deck', deckSchema);

export { DeckModel as default, deckCardSchema };
