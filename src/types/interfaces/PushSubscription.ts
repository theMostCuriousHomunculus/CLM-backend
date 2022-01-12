import mongoose from 'mongoose';

export interface PushSubscriptionKeys {
  auth: string;
  p256dh: string;
}

export default interface PushSubscription extends mongoose.Types.Subdocument {
  endpoint: string;
  keys: PushSubscriptionKeys;
}
