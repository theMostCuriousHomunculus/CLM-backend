import Account from '../../../types/interfaces/Account';
import MatchModel from '../../../models/match-model.js';

export default async function (parent: Account) {
  return await MatchModel.find({
    players: { $elemMatch: { account: parent._id } }
  });
}
