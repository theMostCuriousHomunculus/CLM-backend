import webpush from 'web-push';
import { MongoError } from 'mongodb';

import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface InitiateBudRequestArgs {
  other_user_id: string;
}

export default async function (
  parent: any,
  args: InitiateBudRequestArgs,
  context: CLMRequest
) {
  try {
    const { bearer } = context;

    if (!bearer) {
      throw new HTTPError('You must be logged in to perform this action.', 401);
    }

    const { other_user_id } = args;

    if (other_user_id === bearer._id.toString()) {
      throw new HTTPError('Trying to be your own bud?  How pathetic!', 403);
    }

    const otherUser = await AccountModel.findById(other_user_id);

    if (!otherUser) {
      throw new HTTPError(
        'The provided user ID does not exist in our database.',
        403
      );
    }

    if (
      !bearer.buds.includes(otherUser._id) &&
      !bearer.received_bud_requests.includes(otherUser._id) &&
      !bearer.sent_bud_requests.includes(otherUser._id) &&
      !otherUser.buds.includes(bearer._id) &&
      !otherUser.received_bud_requests.includes(bearer._id) &&
      !otherUser.sent_bud_requests.includes(bearer._id)
    ) {
      bearer.nearby_users.pull(otherUser._id);
      bearer.sent_bud_requests.push(otherUser._id);
      otherUser.nearby_users.pull(bearer._id);
      otherUser.received_bud_requests.push(bearer._id);
      for (const pushSubscription of otherUser.push_subscriptions) {
        webpush.sendNotification(
          pushSubscription,
          JSON.stringify({
            body: `After looking you over, ${bearer.name} liked what they saw and has extended to you an official Cube Level Midnight bud request!`,
            title: 'New Bud Request!',
            url: `${process.env.FRONT_END_URL}/account/${bearer._id.toString()}`
          })
        );
      }
    } else {
      throw new HTTPError(
        'You cannot send a bud request to another user if you are already buds or if there is already a pending bud request from one of you to the other.',
        403
      );
    }
    await otherUser.save();
    pubsub?.publish(otherUser._id.toString(), {
      subscribeAccount: otherUser
    });

    await bearer.save();
    pubsub?.publish(bearer._id.toString(), { subscribeAccount: bearer });

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
