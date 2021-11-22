import Account from '../../../types/interfaces/Account';
import CLMRequest from '../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest
) {
  const { account } = context;

  if (!account) {
    return false;
  } else {
    account.tokens = [];
    await account.save();
    return true;
  }
}
