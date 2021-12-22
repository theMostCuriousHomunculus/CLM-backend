import { GraphQLResolveInfo } from 'graphql';

import Account from '../../../../types/interfaces/Account';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest,
  info: GraphQLResolveInfo
) {
  const { token } = context;

  if (
    ['login', 'register', 'submitPasswordReset'].includes(
      info.path.prev?.key as string
    )
  ) {
    // a new token was just generated
    return parent.tokens[parent.tokens.length - 1];
  } else if ('authenticate' === info.path.prev?.key) {
    // the user already has a token stored as a cookie on the front end; just sending it back to be stored in state/context
    return token;
  } else {
    // token should only be sent when a user authenticates, logs in, registers or resets their password
    return null;
  }
}
