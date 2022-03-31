import webpush from 'web-push';
import { MongoError } from 'mongodb';

import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';
import BudRequestResponse from '../../../../types/enums/BudRequestResponse';

interface RespondToBudRequestArgs {
  other_user_id: BudRequestResponse;
  response: string;
}

export default async function (
  parent: any,
  args: RespondToBudRequestArgs,
  context: CLMRequest
) {
  try {
    const { bearer } = context;

    if (!bearer) {
      throw new HTTPError('You must be logged in to perform this action.', 401);
    }

    const { other_user_id, response } = args;

    const otherUser = await AccountModel.findById(other_user_id);

    if (!otherUser) {
      throw new HTTPError(
        'The provided user ID does not exist in our database.',
        403
      );
    }

    if (
      response === BudRequestResponse.ACCEPT &&
      bearer.received_bud_requests.includes(otherUser._id) &&
      otherUser.sent_bud_requests.includes(bearer._id)
    ) {
      bearer.received_bud_requests.pull(otherUser._id);
      otherUser.sent_bud_requests.pull(bearer._id);
      bearer.buds.push(otherUser._id);
      otherUser.buds.push(bearer._id);
      for (const pushSubscription of bearer.push_subscriptions) {
        webpush.sendNotification(
          pushSubscription,
          JSON.stringify({
            body: `The desire was mutual; you and ${otherUser.name} are now officially buds on Cube Level Midnight!`,
            title: 'Bud Request Accepted!',
            url: `${
              process.env.FRONT_END_URL
            }/account/${otherUser._id.toString()}`
          })
        );
      }
    }

    if (response === BudRequestResponse.REJECT) {
      bearer.received_bud_requests.pull(otherUser._id);
      otherUser.sent_bud_requests.pull(bearer._id);
    }

    await bearer.save();
    pubsub?.publish(bearer._id.toString(), { subscribeAccount: bearer });
    await otherUser.save();
    pubsub?.publish(otherUser._id.toString(), { subscribeAccount: otherUser });

    return bearer;
  } catch (error) {
    if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof HTTPError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
