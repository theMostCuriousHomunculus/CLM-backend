import Account from '../../../models/account-model.js';
export default async function (parent, args) {
  const { email, password } = args;
  const account = await Account.findByCredentials(email, password);
  await account.generateAuthenticationToken();
  return account;
}
//# sourceMappingURL=login.js.map
