import Account from '../../../models/account-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent, args) {
  const account = await Account.findById(args._id);

  if (!account) throw new HTTPError('Profile not found!', 404);

  return account;
}
