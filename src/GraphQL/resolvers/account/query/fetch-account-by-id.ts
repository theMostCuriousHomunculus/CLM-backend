import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../models/account-model.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface FetchAccountByIDArgs {
  _id: string;
}

export default async function (parent: Account, args: FetchAccountByIDArgs) {
  const account = await AccountModel.findById(args._id);

  if (!account) throw new HTTPError('Profile not found!', 404);

  return account;
}
