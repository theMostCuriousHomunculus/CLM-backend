import mongoose from 'mongoose';

import Location from './Location';
import MeasurementSystem from '../enums/MeasurementSystem';
import PushSubscription from './PushSubscription';

export default interface Account extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  admin: boolean;
  avatar: string;
  buds: mongoose.Types.Array<mongoose.Types.ObjectId>;
  email: string;
  location?: Location;
  mtgo_account?: string;
  measurement_system?: MeasurementSystem;
  name: string;
  nearby_users: mongoose.Types.Array<mongoose.Types.ObjectId>;
  password: string;
  push_subscriptions: mongoose.Types.DocumentArray<PushSubscription>;
  radius?: number;
  received_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  reset_token?: string;
  reset_token_expiration?: Date;
  sent_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  tokens: string[];
  generateAuthenticationToken(): Promise<string>;
}
