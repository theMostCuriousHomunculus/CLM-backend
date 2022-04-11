import { MongoError } from 'mongodb';

import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';
import pubsub from '../../../pubsub.js';

interface RevokeBudshipArgs {
  other_user_id: string;
}

export default async function (
  parent: any,
  args: RevokeBudshipArgs,
  context: CLMRequest
) {
  try {
    const { bearer } = context;

    if (!bearer) {
      throw new HTTPError('You must be logged in to perform this action.', 401);
    }

    const { other_user_id } = args;

    const otherUser = await AccountModel.findById(other_user_id);

    if (!otherUser) {
      throw new HTTPError(
        'The provided user ID does not exist in our database.',
        403
      );
    }

    bearer.buds.pull(otherUser._id);
    otherUser.buds.pull(bearer._id);

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
