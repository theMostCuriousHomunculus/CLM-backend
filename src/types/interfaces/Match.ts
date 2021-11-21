import { Types } from 'mongoose';

import MatchCard from './MatchCard';
import MatchPlayer from './MatchPlayer';

export default interface Match {
  _id: Types.ObjectId;
  cube?: Types.ObjectId;
  decks?: Types.Array<Types.ObjectId>;
  event?: Types.ObjectId;
  game_winners: Types.Array<Types.ObjectId>;
  log: string[];
  players: Types.DocumentArray<MatchPlayer>;
  stack: Types.DocumentArray<MatchCard>;
}
