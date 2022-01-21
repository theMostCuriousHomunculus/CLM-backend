import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext.js';
import pubsub from '../../../pubsub.js';

interface SubscribeRTCSessionDescriptionArgs {
  room: string;
}

export default {
  subscribe: function (
    parent: any,
    args: SubscribeRTCSessionDescriptionArgs,
    context: SubscriptionContext
  ) {
    const { bearer, connectionParams } = context;

    if (!bearer) {
      throw new HTTPError('Login to use this feature!', 401);
    }

    const { room } = args;

    return pubsub.asyncIterator(`${room}-${connectionParams?.authToken}`);
  }
};
