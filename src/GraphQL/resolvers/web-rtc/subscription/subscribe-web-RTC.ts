import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext.js';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { bearer, connectionParams } = context;

    if (!bearer) {
      throw new HTTPError('Login to use this feature!', 401);
    }

    if (!('room' in connectionParams!)) {
      throw new HTTPError('You did not provide a room.', 400);
    }

    return pubsub.asyncIterator(
      `${connectionParams.room}-${bearer._id.toString()}`
    );
  }
};
