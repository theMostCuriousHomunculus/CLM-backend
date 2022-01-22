import mongoose from 'mongoose';

import CubeCardSchema from './cube-card.js';
import Module from '../../types/interfaces/Module';

const ModuleSchema = new mongoose.Schema<Module>({
  cards: [CubeCardSchema],
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  }
});

export default ModuleSchema;
