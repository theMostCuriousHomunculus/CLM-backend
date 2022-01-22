import mongoose from 'mongoose';

import Counter from '../../types/interfaces/Counter';

const CounterSchema = new mongoose.Schema<Counter>(
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

export default CounterSchema;
