import mongoose from 'mongoose';

import DeckCard from './DeckCard';
import Format from '../enums/Format';

export default interface Deck extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
  description: string;
  format?: Format;
  image: string;
  mainboard: mongoose.Types.DocumentArray<DeckCard>;
  name: string;
  published: boolean;
  sideboard: mongoose.Types.DocumentArray<DeckCard>;
}
