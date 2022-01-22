import mongoose from 'mongoose';

import CounterSchema from './counter.js';
import MatchCard from '../../types/interfaces/MatchCard';

const MatchCardSchema = new mongoose.Schema<MatchCard>({
  controller: {
    ref: 'AccountModel',
    required: true,
    type: 'ObjectId'
  },
  counters: [CounterSchema],
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

export default MatchCardSchema;
