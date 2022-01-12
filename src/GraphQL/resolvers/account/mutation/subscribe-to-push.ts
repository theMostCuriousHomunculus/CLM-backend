import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import PushSubscription from '../../../../types/interfaces/PushSubscription';

interface SubscribeToPushArgs {
  push_subscription: PushSubscription;
}

export default async function (
  parent: any,
  args: SubscribeToPushArgs,
  context: CLMRequest
) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError('You must be logged in to perform this action.', 401);
  }

  const { push_subscription } = args;

  bearer.push_subscriptions.push(push_subscription);

  await bearer.save();
  return bearer;
}
