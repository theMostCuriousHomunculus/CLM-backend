import { model, Schema } from 'mongoose';

import Counter from '../types/interfaces/Counter';
import Match from '../types/interfaces/Match';
import MatchCard from '../types/interfaces/MatchCard';
import MatchPlayer from '../types/interfaces/MatchPlayer';

const counterSchema = new Schema<Counter>(
  {
    amount: {
      required: true,
      type: Number
    },
    type: {
      required: true,
      type: String
    }
  },
  {
    _id: false
  }
);

const matchCardSchema = new Schema<MatchCard>({
  controller: {
    ref: 'AccountModel',
    required: true,
    type: 'ObjectId'
  },
  counters: [counterSchema],
  face_down: {
    default: false,
    type: Boolean
  },
  face_down_image: {
    enum: ['foretell', 'manifest', 'morph', 'standard'],
    required: true,
    type: String
  },
  flipped: {
    default: false,
    type: Boolean
  },
  isCopyToken: {
    required: true,
    type: Boolean
  },
  index: {
    required: true,
    type: Number
  },
  owner: {
    ref: 'AccountModel',
    required: true,
    type: 'ObjectId'
  },
  scryfall_id: {
    required: true,
    type: String
  },
  sideboarded: {
    default: false,
    required: true,
    type: Boolean
  },
  tapped: {
    default: false,
    required: true,
    type: Boolean
  },
  targets: [
    {
      ref: 'CardModel',
      type: 'ObjectId'
    }
  ],
  visibility: [
    {
      ref: 'AccountModel',
      required: true,
      type: 'ObjectId'
    }
  ],
  x_coordinate: {
    default: 0,
    required: true,
    type: Number,
    validate: [coordinateBoundaries, '{PATH} must be in the interval [0, 100).']
  },
  y_coordinate: {
    default: 0,
    required: true,
    type: Number,
    validate: [coordinateBoundaries, '{PATH} must be in the interval [0, 100).']
  }
});

function coordinateBoundaries(value: number) {
  return value >= 0 && value < 100;
}

const playerSchema = new Schema<MatchPlayer>(
  {
    account: {
      ref: 'AccountModel',
      required: true,
      type: 'ObjectId'
    },
    battlefield: [matchCardSchema],
    energy: {
      default: 0,
      type: Number
    },
    exile: [matchCardSchema],
    graveyard: [matchCardSchema],
    hand: [matchCardSchema],
    library: [matchCardSchema],
    life: {
      default: 20,
      required: true,
      type: Number
    },
    mainboard: [matchCardSchema],
    poison: {
      default: 0,
      type: Number
    },
    sideboard: [matchCardSchema],
    temporary: [matchCardSchema]
  },
  {
    _id: false
  }
);

const matchSchema = new Schema<Match>(
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
    players: [playerSchema],
    stack: [matchCardSchema]
  },
  {
    timestamps: true
  }
);

const MatchModel = model('Match', matchSchema);

export default MatchModel;
