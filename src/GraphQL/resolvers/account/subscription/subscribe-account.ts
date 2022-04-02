import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: async function (
    parent: any,
    args: null,
    context: SubscriptionContext
  ) {
    const { account, bearer } = context;

    if (account) return pubsub.asyncIterator(account._id.toString());

    if (bearer) return pubsub.asyncIterator(bearer._id.toString());

    throw new HTTPError(
      'You must provide an accountID or an authentication token.',
      400
    );
  }
};
