import mongoose from 'mongoose';

export default interface ICECandidate {
  // address: string;
  candidate: string;
  // component: string;
  // foundation: string;
  // port: number;
  // priority: number;
  // protocol: string;
  // relatedAddress: string;
  // relatedPort: number;
  remote_account: mongoose.Types.ObjectId;
  sdpMLineIndex: number;
  sdpMid: string;
  // tcpType: string;
  // type: string;
  usernameFragment: string;
}
