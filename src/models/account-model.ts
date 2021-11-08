import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { model, Schema, Types } from 'mongoose';

import HttpError from './http-error.js';

interface Account {
  _id: Types.ObjectId;
  adming: boolean;
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

const accountSchema = new Schema<Account>({
  admin: {
    default: false,
    required: true,
    type: Boolean
  },
  avatar: {
    required: true,
    type: String
  },
  buds: [
    {
      ref: 'AccountModel',
      type: Types.ObjectId
    }
  ],
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  name: {
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    maxlength: 30,
    required: true,
    trim: true,
    type: String
  },
  password: {
    minlength: 7,
    required: true,
    trim: true,
    type: String
  },
  received_bud_requests: [
    {
      ref: 'AccountModel',
      type: Types.ObjectId
    }
  ],
  reset_token: String,
  reset_token_expiration: Date,
  sent_bud_requests: [
    {
      ref: 'AccountModel',
      type: Types.ObjectId
    }
  ],
  tokens: [
    {
      type: String,
      required: true
    }
  ]
});

accountSchema.methods.generateAuthenticationToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET!);

  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

accountSchema.statics.findByCredentials = async (
  email: string,
  enteredPassword: string
) => {
  const user = await AccountModel.findOne({ email });

  if (!user) {
    throw new HttpError(
      'The provided email address and/or password were incorrect.  Please try again.',
      404
    );
  }

  const isMatch = await bcrypt.compare(enteredPassword, user.password);

  if (!isMatch) {
    throw new HttpError(
      'The provided email address and/or password were incorrect.  Please try again.',
      404
    );
  }

  return user;
};

// allows searching for other users by name for bud request purposes
accountSchema.index({ name: 'text' });

// Hash the plain text password before saving
accountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const AccountModel = model<Account>('Account', accountSchema);

export { AccountModel as default, Account };
