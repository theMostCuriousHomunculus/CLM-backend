import { Document, Types } from 'mongoose';

export default interface Account extends Document {
  _id: Types.ObjectId;
  admin: boolean;
  avatar: string;
  buds: Types.Array<Types.ObjectId>;
  email: string;
  name: string;
  password: string;
  received_bud_requests: Types.Array<Types.ObjectId>;
  reset_token?: string;
  reset_token_expiration?: Date;
  sent_bud_requests: Types.Array<Types.ObjectId>;
  tokens: string[];
}
