import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../models/account-model.js';

export default async function (parent: Account) {
  return await AccountModel.find({
    _id: { $in: parent.received_bud_requests }
  });
}
