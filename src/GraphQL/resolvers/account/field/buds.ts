import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../mongodb/models/account.js';

export default async function (parent: Account) {
  return await AccountModel.find({ _id: { $in: parent.buds } });
}
