import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { cube } = context;

    if (!cube) {
      throw new HTTPError('Could not find a cube with the provided ID.', 404);
    }

    return pubsub.asyncIterator(cube._id.toString());
  }
};
