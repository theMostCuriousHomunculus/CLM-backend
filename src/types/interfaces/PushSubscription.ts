import mongoose from 'mongoose';

export interface Keys {
  auth: string;
  p256dh: string;
}

export default interface PushSubscription extends mongoose.Types.Subdocument {
  _id: mongoose.Types.ObjectId;
  endpoint: string;
  keys: Keys;
}
