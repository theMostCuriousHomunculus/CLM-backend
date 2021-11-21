import { Types } from 'mongoose';

import DeckCard from './DeckCard';
import Format from '../enums/Format';

export default interface Deck {
  _id: Types.ObjectId;
  creator: Types.ObjectId;
  description: string;
  format?: Format;
  mainboard: Types.DocumentArray<DeckCard>;
  name: string;
  sideboard: Types.DocumentArray<DeckCard>;
}
