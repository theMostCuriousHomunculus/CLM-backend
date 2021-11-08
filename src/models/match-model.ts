import { model, Schema, Types } from 'mongoose';

enum FaceDown {
  FORETELL = 'foretell',
  MANIFEST = 'manifest',
  MORPH = 'morph',
  STANDARD = 'standard'
}

interface Counter {
  counterAmount: number;
  counterType: string;
}

interface MatchCard {
  controller: Types.ObjectId;
  counters: Counter[];
  face_down: boolean;
  face_down_image: FaceDown;
  flipped: boolean;
  isCopyToken: boolean;
  index: number;
  owner: Types.ObjectId;
  scryfall_id: string;
  sideboarded: boolean;
  tapped: boolean;
  targets: Types.ObjectId[];
  visibility: Types.ObjectId[];
  x_coordinate: number;
  y_coordinate: number;
}

interface Player {
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

interface Match {
  cube?: Types.ObjectId;
  decks?: Types.ObjectId[];
  event?: Types.ObjectId;
  game_winners: Types.ObjectId[];
  log: string[];
  players: Player[];
  stack: MatchCard[];
}

const counterSchema = new Schema<Counter>(
  {
    counterAmount: {
      required: true,
      type: Number
    },
    counterType: {
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
    type: Types.ObjectId
  },
  counters: [counterSchema],
  face_down: {
    default: false,
    type: Boolean
  },
  face_down_image: {
    default: 'standard',
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
    type: Types.ObjectId
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
      type: Types.ObjectId
    }
  ],
  visibility: [
    {
      ref: 'AccountModel',
      required: true,
      type: Types.ObjectId
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

const playerSchema = new Schema<Player>(
  {
    account: {
      ref: 'AccountModel',
      required: true,
      type: Types.ObjectId
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
      type: Types.ObjectId
    },
    decks: [
      {
        ref: 'DeckModel',
        required: false,
        type: Types.ObjectId
      }
    ],
    event: {
      ref: 'EventModel',
      required: false,
      type: Types.ObjectId
    },
    game_winners: [
      {
        ref: 'AccountModel',
        required: true,
        type: Types.ObjectId
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

export { MatchModel as default, Match, MatchCard, Player };
