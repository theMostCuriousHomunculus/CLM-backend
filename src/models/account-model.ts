import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Account from '../types/interfaces/Account';
import HTTPError from '../types/classes/HTTPError.js';
import Location from '../types/interfaces/Location';
import AccountModelInterface from '../types/interfaces/AccountModel';

const { model, Schema } = mongoose;

const locationSchema = new Schema<Location>(
  {
    type: {
      default: 'Point',
      type: String
    },
    coordinates: {
      type: [Number],
      validate: {
        message:
          'Coordinates is an array with two numbers, the first longitude (-180, 180) and the second latitude (-90, 90).',
        validator: function (value: [number, number]) {
          if (
            value.length !== 2 ||
            value[0] < -180 ||
            value[0] > 180 ||
            value[1] < -90 ||
            value[1] > 90
          ) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  },
  {
    _id: false
  }
);

// const settingsSchema = new Schema<>(
//   {
//     location_services: {
//       default: false,
//       type: Boolean
//     },
//     measurement_system: {
//       default: MeasurementSystem.IMPERIAL,
//       type: MeasurementSystem
//     },
//     radius: {
//       default: 10,
//       type: Number
//     }
//   },
//   {
//     _id: false
//   }
// );

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
  location: locationSchema,
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
    location_services: {
      default: false,
      type: Boolean
    },
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

accountSchema.methods.generateAuthenticationToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET!);

  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

accountSchema.static(
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
accountSchema.index({ name: 'text' });

// allows searching for nearby users
accountSchema.index({ location: '2dsphere' });

// hash the plain text password before saving
accountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const AccountModel = model<Account, AccountModelInterface>(
  'Account',
  accountSchema
);

export default AccountModel;
