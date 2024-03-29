import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../mongodb/models/account.js';

interface LoginArgs {
  email: string;
  password: string;
}

export default async function (parent: Account, args: LoginArgs) {
  const { email, password } = args;
  const account = await AccountModel.findByCredentials(email, password);
  await account.generateAuthenticationToken();

  return account;
}
