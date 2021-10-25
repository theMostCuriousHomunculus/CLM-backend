export default async function (parent, args, context) {
  const { account } = context;
  if (!account) {
    return false;
  } else {
    account.tokens = [];
    await account.save();
    return true;
  }
}
//# sourceMappingURL=logout-all-devices.js.map
