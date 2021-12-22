import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { blogPost } = context;

    if (!blogPost) {
      throw new HTTPError(
        'Could not find a blog post with the provided ID.',
        404
      );
    }

    return pubsub.asyncIterator(blogPost._id.toString());
  }
};
