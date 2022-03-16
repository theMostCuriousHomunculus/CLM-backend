import mongoose from 'mongoose';

import DeckCard from './DeckCard';
import Format from '../enums/Format';

export default interface Deck extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  cards: mongoose.Types.DocumentArray<DeckCard>;
  creator: mongoose.Types.ObjectId;
  description: string;
  format?: Format;
  image: string;
  name: string;
  published: boolean;
}
