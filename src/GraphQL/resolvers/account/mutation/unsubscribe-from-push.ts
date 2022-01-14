import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

interface UnsubscribeFromPushArgs {
  endpoint: string;
}

export default async function (
  parent: any,
  args: UnsubscribeFromPushArgs,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to perform this action.', 401);
  }

  const { endpoint } = args;

  bearer.push_subscriptions.pull({ endpoint });

  await bearer.save();
  return bearer;
}
