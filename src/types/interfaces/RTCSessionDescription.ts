import mongoose from 'mongoose';

import RTCSessionDescriptionType from '../enums/RTCSessionDescriptionType';

export default interface RTCSessionDescription
  extends mongoose.Types.Subdocument {
  remote_account: mongoose.Types.ObjectId;
  sdp: string;
  type: RTCSessionDescriptionType;
}
