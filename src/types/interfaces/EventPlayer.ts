import { Types } from 'mongoose';

import DeckCard from './DeckCard';

export default interface Player extends Types.Subdocument {
  account: Types.ObjectId;
  mainboard: Types.DocumentArray<DeckCard>;
  packs: Types.Array<Types.DocumentArray<DeckCard>>;
  queue: Types.Array<Types.DocumentArray<DeckCard>>;
  sideboard: Types.DocumentArray<DeckCard>;
}
