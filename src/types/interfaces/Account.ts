import mongoose from 'mongoose';

import Location from './Location';

export default interface Account extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  admin: boolean;
  avatar: string;
  buds: mongoose.Types.Array<mongoose.Types.ObjectId>;
  email: string;
  location?: Location;
  name: string;
  password: string;
  received_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  reset_token?: string;
  reset_token_expiration?: Date;
  sent_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  tokens: string[];
}
