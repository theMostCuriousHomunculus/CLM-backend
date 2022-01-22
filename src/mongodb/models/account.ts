import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Account from '../../types/interfaces/Account';
import AccountModelInterface from '../../types/interfaces/AccountModel';
import HTTPError from '../../types/classes/HTTPError.js';
import LocationSchema from '../schemas/location.js';
import PushSubscriptionSchema from '../schemas/push-subscription.js';

const { model, Schema } = mongoose;

const AccountSchema = new Schema<Account>({
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
      type: 'ObjectId'
    }
  ],
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  location: LocationSchema,
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
  nearby_users: [
    {
      ref: 'AccountModel',
      type: 'ObjectId'
    }
  ],
  password: {
    minlength: 7,
    required: true,
    trim: true,
    type: String
  },
  push_subscriptions: [PushSubscriptionSchema],
  received_bud_requests: [
    {
      ref: 'AccountModel',
      type: 'ObjectId'
    }
  ],
  reset_token: String,
  reset_token_expiration: Date,
  sent_bud_requests: [
    {
      ref: 'AccountModel',
      type: 'ObjectId'
    }
  ],
  settings: {
    measurement_system: {
      default: 'imperial',
      enum: ['imperial', 'metric'],
      type: String
    },
    radius: {
      default: 10,
      type: Number
    }
  },
  tokens: [
    {
      type: String,
      required: true
    }
  ]
});

AccountSchema.methods.generateAuthenticationToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET!);

  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

AccountSchema.static(
  'findByCredentials',
  async function findByCredentials(email: string, enteredPassword: string) {
    const user = await AccountModel.findOne({ email });

    if (!user) {
      throw new HTTPError(
        'The provided email address and/or password were incorrect.  Please try again.',
        404
      );
    }

    const isMatch = await bcrypt.compare(enteredPassword, user.password);

    if (!isMatch) {
      throw new HTTPError(
        'The provided email address and/or password were incorrect.  Please try again.',
        404
      );
    }

    return user;
  }
);

// allows searching for other users by name for bud request purposes
AccountSchema.index({ name: 'text' });

// allows searching for nearby users
AccountSchema.index({ location: '2dsphere' });

// hash the plain text password before saving
AccountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const AccountModel = model<Account, AccountModelInterface>(
  'Account',
  AccountSchema
);

export default AccountModel;
