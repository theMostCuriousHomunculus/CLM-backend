import { GraphQLResolveInfo } from 'graphql';

import Account from '../../../types/interfaces/Account';
import CLMRequest from '../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest,
  info: GraphQLResolveInfo
) {
  if (
    !['login', 'register', 'submitPasswordReset'].includes(
      info.path.prev?.key as string
    )
  ) {
    // token should only be sent when a user logs in, registers or resets their password
    return null;
  } else {
    return parent.tokens[parent.tokens.length - 1];
  }
}
