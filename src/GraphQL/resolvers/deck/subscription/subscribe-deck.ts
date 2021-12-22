import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { deck } = context;

    if (!deck) {
      throw new HTTPError('Could not find a deck with the provided ID.', 404);
    }

    return pubsub.asyncIterator(deck._id.toString());
  }
};
