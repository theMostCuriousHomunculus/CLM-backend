import { Document, Types } from 'mongoose';

import MatchCard from './MatchCard';

export default interface Player extends Document {
  account: Types.ObjectId;
  battlefield: Types.DocumentArray<MatchCard>;
  energy: number;
  exile: Types.DocumentArray<MatchCard>;
  graveyard: Types.DocumentArray<MatchCard>;
  hand: Types.DocumentArray<MatchCard>;
  library: Types.DocumentArray<MatchCard>;
  life: number;
  mainboard: Types.DocumentArray<MatchCard>;
  poison: number;
  sideboard: Types.DocumentArray<MatchCard>;
  temporary: Types.DocumentArray<MatchCard>;
}
