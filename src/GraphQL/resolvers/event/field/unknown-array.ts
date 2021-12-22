import { defaultFieldResolver, GraphQLResolveInfo } from 'graphql';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import EventPlayer from '../../../../types/interfaces/EventPlayer.js';

export default async (
  parent: EventPlayer,
  args: any,
  context: CLMRequest,
  info: GraphQLResolveInfo
) => {
  const { bearer, event } = context;

  if (!event) {
    throw new HTTPError('Could not find an event with the provided ID.', 404);
  }

  if (
    bearer &&
    [parent.account.toString(), event.host.toString()].includes(
      bearer._id.toString()
    )
  ) {
    return defaultFieldResolver.apply(this, [parent, args, context, info]);
  } else {
    return null;
  }
};
