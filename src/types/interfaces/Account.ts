import { Types } from 'mongoose';

export default interface Account {
  _id: Types.ObjectId;
  admin: boolean;
  avatar: string;
  buds: Types.ObjectId[];
  email: string;
  name: string;
  password: string;
  received_bud_requests: Types.ObjectId[];
  reset_token?: string;
  reset_token_expiration?: Date;
  sent_bud_requests: Types.ObjectId[];
  tokens: string[];
}
