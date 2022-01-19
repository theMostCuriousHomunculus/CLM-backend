import mongoose from 'mongoose';

import { deckCardSchema } from './deck-model.js';
import Event from '../types/interfaces/Event';
import EventPlayer from '../types/interfaces/EventPlayer';
import ICECandidate from '../types/interfaces/ICECandidate';
import RTCSessionDescription from '../types/interfaces/RTCSessionDescription.js';

const { model, Schema } = mongoose;

const iceCandidateSchema = new Schema<ICECandidate>(
  {
    // address: String,
    candidate: String,
    // component: String,
    // foundation: String,
    // port: Number,
    // priority: Number,
    // protocol: String,
    // relatedAddress: String,
    // relatedPort: Number,
    sdpMLineIndex: Number,
    sdpMid: String,
    // tcpType: String,
    // type: String,
    usernameFragment: String
  },
  {
    _id: false
  }
);

const rtcSessionDescriptionSchema = new Schema<RTCSessionDescription>(
  {
    remote_account: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    sdp: {
      required: true,
      type: String
    },
    type: {
      enum: ['answer', 'offer', 'pranswer', 'rollback'],
      required: true,
      type: String
    }
  },
  {
    _id: false
  }
);

const playerSchema = new Schema<EventPlayer>(
  {
    account: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    answers: [rtcSessionDescriptionSchema],
    ice_candidates: [iceCandidateSchema],
    mainboard: [deckCardSchema],
    offers: [rtcSessionDescriptionSchema],
    packs: [[deckCardSchema]],
    present: {
      default: false,
      type: Boolean
    },
    queue: [[deckCardSchema]],
    sideboard: [deckCardSchema]
  },
  {
    _id: false
  }
);

const eventSchema = new Schema<Event>(
  {
    cube: {
      ref: 'CubeModel',
      required: true,
      type: 'ObjectId'
    },
    finished: {
      default: false,
      required: true,
      type: Boolean
    },
    host: {
      type: 'ObjectId',
      ref: 'AccountModel',
      required: true
    },
    name: {
      required: true,
      trim: true,
      type: String
    },
    players: [playerSchema]
  },
  {
    timestamps: true
  }
);

eventSchema.index({ name: 'text' });

const EventModel = model<Event>('Event', eventSchema);

export default EventModel;
