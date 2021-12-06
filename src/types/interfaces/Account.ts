import mongoose from 'mongoose';

import Location from './Location';
import MeasurementSystem from '../enums/MeasurementSystem';

export default interface Account extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  admin: boolean;
  avatar: string;
  buds: mongoose.Types.Array<mongoose.Types.ObjectId>;
  email: string;
  location?: Location;
  name: string;
  nearby_users: mongoose.Types.Array<mongoose.Types.ObjectId>;
  password: string;
  received_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  reset_token?: string;
  reset_token_expiration?: Date;
  sent_bud_requests: mongoose.Types.Array<mongoose.Types.ObjectId>;
  settings: {
    location_services: boolean;
    measurement_system: MeasurementSystem;
    radius: number;
  };
  tokens: string[];
}
