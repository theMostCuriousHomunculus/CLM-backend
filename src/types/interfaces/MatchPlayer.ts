import { Types } from 'mongoose';

import MatchCard from './MatchCard';

export default interface Player {
  account: Types.ObjectId;
  battlefield: MatchCard[];
  energy: number;
  exile: MatchCard[];
  graveyard: MatchCard[];
  hand: MatchCard[];
  library: MatchCard[];
  life: number;
  mainboard: MatchCard[];
  poison: number;
  sideboard: MatchCard[];
  temporary: MatchCard[];
}
