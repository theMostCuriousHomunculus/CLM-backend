import mongoose from 'mongoose';

import PushSubscription from '../../types/interfaces/PushSubscription';

const PushSubscriptionSchema = new mongoose.Schema<PushSubscription>(
  {
    endpoint: {
      required: true,
      type: String
    },
    keys: {
      auth: {
        required: true,
        type: String
      },
      p256dh: {
        required: true,
        type: String
      }
    }
  },
  {
    _id: false
  }
);

export default PushSubscriptionSchema;
