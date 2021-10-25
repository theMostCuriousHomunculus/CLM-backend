import Account from '../../../models/account-model.js';
export default async function (parent) {
  const account = await Account.findById(parent.creator);
  return account;
}
//# sourceMappingURL=creator.js.map
