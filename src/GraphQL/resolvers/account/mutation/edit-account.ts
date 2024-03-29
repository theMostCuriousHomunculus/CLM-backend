import mongoose from 'mongoose';
import webpush from 'web-push';
import { MongoError } from 'mongodb';

import Account from '../../../../types/interfaces/Account.js';
import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import MeasurementSystem from '../../../../types/enums/MeasurementSystem.js';
import Settings from '../../../../types/interfaces/Settings.js';

interface EditAccountArgs {
  action?: string;
  avatar?: string;
  email?: string;
  name?: string;
  other_user_id?: string;
  password?: string;
  return_other?: boolean;
  settings?: Settings;
}

export default async function (
  parent: any,
  args: EditAccountArgs,
  context: CLMRequest
) {
  try {
    const { bearer } = context;

    if (!bearer) {
      throw new HTTPError('You must be logged in to perform this action.', 401);
    }

    const { action, other_user_id, return_other, settings } = args;
    const mutableFields = ['avatar', 'email', 'name', 'password'];

    for (const field of mutableFields) {
      if (
        args[field as keyof EditAccountArgs] &&
        args[field as keyof EditAccountArgs] !== 'null' &&
        args[field as keyof EditAccountArgs] !== 'undefined'
      ) {
        (bearer[field as keyof Account] as any) =
          args[field as keyof EditAccountArgs];
      }
    }

    if (settings) {
      bearer.settings.measurement_system = settings.measurement_system;
      bearer.settings.radius = settings.radius;

      const nearbyUsers = await AccountModel.aggregate([
        {
          $geoNear: {
            distanceField: 'meters_away',
            maxDistance:
              bearer.settings.radius *
              (bearer.settings.measurement_system === MeasurementSystem.IMPERIAL
                ? 1609.344
                : 1000),
            near: {
              type: 'Point',
              coordinates: bearer.location?.coordinates
            },
            query: {
              _id: {
                $ne: bearer._id
              },
              buds: {
                $not: {
                  $elemMatch: {
                    $eq: bearer._id
                  }
                }
              },
              nearby_users: {
                $not: {
                  $elemMatch: {
                    $eq: bearer._id
                  }
                }
              },
              received_bud_requests: {
                $not: {
                  $elemMatch: {
                    $eq: bearer._id
                  }
                }
              },
              sent_bud_requests: {
                $not: {
                  $elemMatch: {
                    $eq: bearer._id
                  }
                }
              }
            }
          }
        }
      ]);

      bearer.nearby_users =
        [] as unknown[] as mongoose.Types.Array<mongoose.Types.ObjectId>;
      nearbyUsers.forEach(async (aggregatedUser) => {
        bearer.nearby_users.push(aggregatedUser._id);
      });
    }

    if (other_user_id) {
      const otherUser = await AccountModel.findById(other_user_id);

      if (!otherUser) {
        throw new HTTPError(
          'We are unable to process your request because the other user does not exist in our database.',
          403
        );
      }

      if (otherUser._id.toString() === bearer._id.toString()) {
        throw new HTTPError("You must provide a different user's ID.", 403);
      }

      switch (action) {
        case 'accept':
          if (
            bearer.received_bud_requests.includes(otherUser._id) &&
            otherUser.sent_bud_requests.includes(bearer._id)
          ) {
            bearer.received_bud_requests.pull(otherUser._id);
            otherUser.sent_bud_requests.pull(bearer._id);
            bearer.buds.push(otherUser._id);
            otherUser.buds.push(bearer._id);
            break;
          } else {
            throw new HTTPError(
              'You cannot accept a bud request that you did not receive or that the other user did not send.',
              403
            );
          }
        case 'reject':
          bearer.received_bud_requests.pull(otherUser._id);
          otherUser.sent_bud_requests.pull(bearer._id);
          break;
        case 'remove':
          bearer.buds.pull(otherUser._id);
          otherUser.buds.pull(bearer._id);
          break;
        case 'send':
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
                  url: `${
                    process.env.FRONT_END_URL
                  }/account/${bearer._id.toString()}`
                })
              );
            }
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

      await bearer.save();
      await otherUser.save();

      if (return_other) {
        return otherUser;
      } else {
        return bearer;
      }
    } else {
      await bearer.save();
      return bearer;
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
