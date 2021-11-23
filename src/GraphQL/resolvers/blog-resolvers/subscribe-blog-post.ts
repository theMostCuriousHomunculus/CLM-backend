import HTTPError from '../../../types/classes/HTTPError';
import SubscriptionContext from '../../../types/interfaces/SubscriptionContext';

export default {
  subscribe: function (parent: any, args: null, context: SubscriptionContext) {
    const { blogPost, pubsub } = context;

    if (!blogPost) {
      throw new HTTPError(
        'Could not find a blog post with the provided ID.',
        404
      );
    }

    if (!pubsub) {
      throw new HTTPError('Failed to subscribe.', 500);
    }

    return pubsub.asyncIterator(blogPost._id.toString());
  }
};
