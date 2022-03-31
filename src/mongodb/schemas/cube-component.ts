import mongoose from 'mongoose';

import Module from '../../types/interfaces/Module';
import Rotation from '../../types/interfaces/Rotation';

const CubeComponentSchema = new mongoose.Schema<Module | Rotation>({
  name: {
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  }
});

export default CubeComponentSchema;
