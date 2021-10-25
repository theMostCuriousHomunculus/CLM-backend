import Account from '../../../models/account-model.js';

export default async function (parent, args) {
  const {
    input: { email, password }
  } = args;
  const account = await Account.findByCredentials(email, password);
  const token = await account.generateAuthenticationToken();

  return {
    isAdmin: account.admin,
    token,
    userId: account._id
  };
}
