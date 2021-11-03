import Account from '../../../models/account-model.js';
export default async function (parent) {
  const account = await Account.findById(parent.account);
  return account;
}
//# sourceMappingURL=event-account.js.map
