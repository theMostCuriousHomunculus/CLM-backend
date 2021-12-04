import Account from '../../../types/interfaces/Account';
import CLMRequest from '../../../types/interfaces/CLMRequest';

export default async (parent: Account, args: any, context: CLMRequest) => {
  const { account } = context;
  if (!account || account._id.toString() !== parent._id.toString()) {
    return null;
  } else {
    return !!account.location;
  }
};
