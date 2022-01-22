import mongoose from 'mongoose';

import Match from '../../types/interfaces/Match';
import MatchCardSchema from '../schemas/match-card.js';
import MatchPlayerSchema from '../schemas/match-player.js';

const { model, Schema } = mongoose;

const MatchSchema = new Schema<Match>(
  {
    cube: {
      ref: 'CubeModel',
      required: false,
      type: 'ObjectId'
    },
    decks: [
      {
        ref: 'DeckModel',
        required: false,
        type: 'ObjectId'
      }
    ],
    event: {
      ref: 'EventModel',
      required: false,
      type: 'ObjectId'
    },
    game_winners: [
      {
        ref: 'AccountModel',
        required: true,
        type: 'ObjectId'
      }
    ],
    log: [String],
    players: [MatchPlayerSchema],
    stack: [MatchCardSchema]
  },
  {
    timestamps: true
  }
);

const MatchModel = model('Match', MatchSchema);

export default MatchModel;
