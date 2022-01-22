import mongoose from 'mongoose';

import CubeCardSchema from './cube-card.js';
import Rotation from '../../types/interfaces/Rotation';

const RotationSchema = new mongoose.Schema<Rotation>({
  cards: [CubeCardSchema],
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  },
  size: {
    type: Number,
    required: true
  }
});

export default RotationSchema;
