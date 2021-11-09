import { Types } from 'mongoose';

import DeckCard from './DeckCard';

export default interface Player {
  account: Types.ObjectId;
  mainboard: DeckCard[];
  packs: DeckCard[][];
  queue: DeckCard[][];
  sideboard: DeckCard[];
}
