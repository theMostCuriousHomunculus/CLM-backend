import { Types } from 'mongoose';

import MatchCard from './MatchCard';
import MatchPlayer from './MatchPlayer';

export default interface Match {
  _id: Types.ObjectId;
  cube?: Types.ObjectId;
  decks?: Types.ObjectId[];
  event?: Types.ObjectId;
  game_winners: Types.ObjectId[];
  log: string[];
  players: MatchPlayer[];
  stack: MatchCard[];
}
