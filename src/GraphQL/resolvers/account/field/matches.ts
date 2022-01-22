import Account from '../../../../types/interfaces/Account';
import MatchModel from '../../../../mongodb/models/match.js';

export default async function (parent: Account) {
  return await MatchModel.find({
    players: { $elemMatch: { account: parent._id } }
  });
}
