import { model, Schema, Types } from 'mongoose';

enum Format {
  CLASSY = 'Classy',
  FREEFORM = 'Freeform',
  LEGACY = 'Legacy',
  MODERN = 'Modern',
  PAUPER = 'Pauper',
  PIONEER = 'Pioneer',
  STANDARD = 'Standard',
  VINTAGE = 'Vintage'
}

interface DeckCard {
  name: string;
  scryfall_id: string;
}

interface Deck {
  creator: Types.ObjectId;
  description: string;
  format?: Format;
  mainboard: DeckCard[];
  name: string;
  sideboard: DeckCard[];
}

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
    type: Types.ObjectId
  },
  description: {
    default: '',
    index: {
      collation: { locale: 'en', strength: 2 }
    },
    type: String
  },
  format: {
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
    required: false,
    type: String
  },
  mainboard: [deckCardSchema],
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    required: true,
    trim: true,
    type: String
  },
  sideboard: [deckCardSchema]
});

deckSchema.index({ name: 'text', description: 'text' });

const DeckModel = model<Deck>('Deck', deckSchema);

export { DeckModel as default, Deck, DeckCard, deckCardSchema };
