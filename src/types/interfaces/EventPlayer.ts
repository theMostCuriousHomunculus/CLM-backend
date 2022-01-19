import mongoose from 'mongoose';

import DeckCard from './DeckCard';
import RTCSessionDescription from './RTCSessionDescription';

export default interface EventPlayer extends mongoose.Types.Subdocument {
  account: mongoose.Types.ObjectId;
  answers: mongoose.Types.Array<
    mongoose.Types.DocumentArray<RTCSessionDescription>
  >;
  // ice_candidates: any[];
  mainboard: mongoose.Types.DocumentArray<DeckCard>;
  offers: mongoose.Types.Array<
    mongoose.Types.DocumentArray<RTCSessionDescription>
  >;
  packs: mongoose.Types.Array<mongoose.Types.DocumentArray<DeckCard>>;
  present: boolean;
  queue: mongoose.Types.Array<mongoose.Types.DocumentArray<DeckCard>>;
  sideboard: mongoose.Types.DocumentArray<DeckCard>;
}
