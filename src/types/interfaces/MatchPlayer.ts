import mongoose from 'mongoose';

import MatchCard from './MatchCard';

export default interface MatchPlayer extends mongoose.Document {
  account: mongoose.Types.ObjectId;
  battlefield: mongoose.Types.DocumentArray<MatchCard>;
  energy: number;
  exile: mongoose.Types.DocumentArray<MatchCard>;
  graveyard: mongoose.Types.DocumentArray<MatchCard>;
  hand: mongoose.Types.DocumentArray<MatchCard>;
  library: mongoose.Types.DocumentArray<MatchCard>;
  life: number;
  mainboard: mongoose.Types.DocumentArray<MatchCard>;
  poison: number;
  sideboard: mongoose.Types.DocumentArray<MatchCard>;
  temporary: mongoose.Types.DocumentArray<MatchCard>;
}
