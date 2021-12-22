import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext.js';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { event } = context;

    if (!event) {
      throw new HTTPError('Could not find an event with the provided ID.', 404);
    }

    return pubsub.asyncIterator(event._id.toString());
  }
};
