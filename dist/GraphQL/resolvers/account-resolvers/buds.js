import Account from '../../../models/account-model.js';
export default async function (parent) {
  const budObjects = await Account.find({ _id: { $in: parent.buds } });
  return budObjects;
}
//# sourceMappingURL=buds.js.map
