import mongoose from 'mongoose';

export default interface ICECandidate extends mongoose.Types.Subdocument {
  // address: string;
  candidate: string;
  // component: string;
  // foundation: string;
  // port: number;
  // priority: number;
  // protocol: string;
  // relatedAddress: string;
  // relatedPort: number;
  sdpMLineIndex: number;
  sdpMid: string;
  // tcpType: string;
  // type: string;
  usernameFragment: string;
}
