import AccountModel from '../../../mongodb/models/account.js';

export default async function (parent) {
  const account = await AccountModel.findById(parent.account);

  return account;
}
