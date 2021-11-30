import mongoose from 'mongoose';

import MatchCard from './MatchCard';
import MatchPlayer from './MatchPlayer';

export default interface Match {
  _id: mongoose.Types.ObjectId;
  cube?: mongoose.Types.ObjectId;
  decks?: mongoose.Types.Array<mongoose.Types.ObjectId>;
  event?: mongoose.Types.ObjectId;
  game_winners: mongoose.Types.Array<mongoose.Types.ObjectId>;
  log: string[];
  players: mongoose.Types.DocumentArray<MatchPlayer>;
  stack: mongoose.Types.DocumentArray<MatchCard>;
}
