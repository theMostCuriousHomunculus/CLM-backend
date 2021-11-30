import HTTPError from '../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../types/interfaces/SubscriptionContext';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { cube, pubsub } = context;

    if (!cube) {
      throw new HTTPError('Could not find a cube with the provided ID.', 404);
    }

    if (!pubsub) {
      throw new HTTPError('Failed to subscribe.', 500);
    }

    return pubsub.asyncIterator(cube._id.toString());
  }
};
