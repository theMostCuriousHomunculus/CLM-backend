import Account from '../../../types/interfaces/Account';
import AccountModel from '../../../models/account-model.js';
import CLMRequest from '../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest
) {
  const { account } = context;
  if (!account || account._id.toString() !== parent._id.toString()) {
    return null;
  } else {
    return await AccountModel.find({ _id: { $in: parent.nearby_users } });
  }
}
