import HTTPError from '../../../../types/classes/HTTPError.js';
import SubscriptionContext from '../../../../types/interfaces/SubscriptionContext';
import pubsub from '../../../pubsub.js';

export default {
  subscribe: async function (
    parent: any,
    args: null,
    context: SubscriptionContext
  ) {
    const { connectionParams } = context;

    if (!('deckID' in connectionParams!)) {
      throw new HTTPError('You did not provide a deckID.', 400);
    }

    return pubsub.asyncIterator(connectionParams.deckID as string);
  }
};
