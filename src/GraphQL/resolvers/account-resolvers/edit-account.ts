import { MongoError } from 'mongodb';

import Account from '../../../types/interfaces/Account';
import AccountModel from '../../../models/account-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import CLMRequest from '../../../types/interfaces/CLMRequest';

interface EditAccountArgs {
  action: string;
  avatar: string;
  email: string;
  name: string;
  other_user_id: string;
  password: string;
  return_other: boolean;
}

export default async function (
  parent: any,
  args: EditAccountArgs,
  context: CLMRequest
) {
  try {
    const { account } = context;

    if (!account)
      throw new HTTPError('You must be logged in to perform this action.', 401);

    const { action, other_user_id, return_other } = args;
    const mutableFields = ['avatar', 'email', 'name', 'password'];

    for (let field of mutableFields) {
      if (
        args[field as keyof EditAccountArgs] &&
        args[field as keyof EditAccountArgs] !== 'null' &&
        args[field as keyof EditAccountArgs] !== 'undefined'
      ) {
        (account[field as keyof Account] as any) =
          args[field as keyof EditAccountArgs];
      }
    }

    if (
      other_user_id &&
      other_user_id !== 'null' &&
      other_user_id !== 'undefined'
    ) {
      const otherUser = await AccountModel.findById(other_user_id);

      if (!otherUser) {
        throw new HTTPError(
          'We are unable to process your request because the other user does not exist in our database.',
          403
        );
      }

      if (otherUser._id.toString() === account._id.toString()) {
        throw new HTTPError("You must provide a different user's ID.", 403);
      }

      switch (action) {
        case 'accept':
          if (
            account.received_bud_requests.includes(otherUser._id) &&
            otherUser.sent_bud_requests.includes(account._id)
          ) {
            account.received_bud_requests.pull(otherUser._id);
            otherUser.sent_bud_requests.pull(account._id);
            account.buds.push(otherUser._id);
            otherUser.buds.push(account._id);
            break;
          } else {
            throw new HTTPError(
              'You cannot accept a bud request that you did not receive or that the other user did not send.',
              403
            );
          }
        case 'reject':
          account.received_bud_requests.pull(otherUser._id);
          otherUser.sent_bud_requests.pull(account._id);
          break;
        case 'remove':
          account.buds.pull(otherUser._id);
          otherUser.buds.pull(account._id);
          break;
        case 'send':
          if (
            !account.buds.includes(otherUser._id) &&
            !account.received_bud_requests.includes(otherUser._id) &&
            !account.sent_bud_requests.includes(otherUser._id) &&
            !otherUser.buds.includes(account._id) &&
            !otherUser.received_bud_requests.includes(account._id) &&
            !otherUser.sent_bud_requests.includes(account._id)
          ) {
            account.nearby_users.pull(otherUser._id);
            account.sent_bud_requests.push(otherUser._id);
            otherUser.nearby_users.pull(account._id);
            otherUser.received_bud_requests.push(account._id);
            break;
          } else {
            throw new HTTPError(
              'You cannot send a bud request to another user if you are already buds or if there is already a pending bud request from one of you to the other.',
              403
            );
          }
        default:
          throw new HTTPError(
            'Invalid action attempted.  Action must be "accept", "reject", "remove" or "send".',
            403
          );
      }

      await account.save();
      await otherUser.save();

      if (return_other) {
        return otherUser;
      } else {
        return account;
      }
    } else {
      await account.save();
      return account;
    }
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new HTTPError(
        'The provided email address and/or username are/is already in use.  Email addresses and usernames must be unique.',
        409
      );
    } else if (error instanceof MongoError) {
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
