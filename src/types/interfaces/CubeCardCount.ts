import mongoose from 'mongoose';

export default interface CubeCardCount {
  component: string | mongoose.Types.ObjectId;
  count: number;
}
