import mongoose from 'mongoose';

import MatchCardSchema from './match-card.js';
import MatchPlayer from '../../types/interfaces/MatchPlayer';

const MatchPlayerSchema = new mongoose.Schema<MatchPlayer>(
  {
    account: {
      ref: 'AccountModel',
      required: true,
      type: 'ObjectId'
    },
    battlefield: [MatchCardSchema],
    energy: {
      default: 0,
      type: Number
    },
    exile: [MatchCardSchema],
    graveyard: [MatchCardSchema],
    hand: [MatchCardSchema],
    library: [MatchCardSchema],
    life: {
      default: 20,
      required: true,
      type: Number
    },
    mainboard: [MatchCardSchema],
    poison: {
      default: 0,
      type: Number
    },
    sideboard: [MatchCardSchema],
    temporary: [MatchCardSchema]
  },
  {
    _id: false
  }
);

export default MatchPlayerSchema;
