import { defaultFieldResolver, GraphQLResolveInfo } from 'graphql';

import Account from '../../../types/interfaces/Account';
import CLMRequest from '../../../types/interfaces/CLMRequest';

export default async (
  parent: Account,
  args: any,
  context: CLMRequest,
  info: GraphQLResolveInfo
) => {
  const { account } = context;
  if (!account || account._id.toString() !== parent._id.toString()) {
    return null;
  } else {
    return defaultFieldResolver.apply(this, [parent, args, context, info]);
  }
};
