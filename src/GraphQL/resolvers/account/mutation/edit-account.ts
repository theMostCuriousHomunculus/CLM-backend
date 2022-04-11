import mongoose from 'mongoose';
import webpush from 'web-push';
import { MongoError } from 'mongodb';

import Account from '../../../../types/interfaces/Account';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import HTTPError from '../../../../types/classes/HTTPError.js';
import MeasurementSystem from '../../../../types/enums/MeasurementSystem.js';
import pubsub from '../../../pubsub.js';

interface EditAccountArgs {
  avatar?: string;
  email?: string;
  measurement_system?: MeasurementSystem;
  name?: string;
  radius?: number;
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

    for (const [key, value] of Object.entries(args)) {
      (bearer[key as keyof Account] as any) = value;
    }

    // if (settings && bearer.location) {
    //   bearer.settings.measurement_system = settings.measurement_system;
    //   bearer.settings.radius = settings.radius;

    //   const nearbyUsers = await AccountModel.aggregate([
    //     {
    //       $geoNear: {
    //         distanceField: 'meters_away',
    //         maxDistance:
    //           bearer.settings.radius *
    //           (bearer.settings.measurement_system === MeasurementSystem.IMPERIAL
    //             ? 1609.344
    //             : 1000),
    //         near: {
    //           type: 'Point',
    //           coordinates: bearer.location.coordinates
    //         },
    //         query: {
    //           _id: {
    //             $ne: bearer._id
    //           },
    //           buds: {
    //             $not: {
    //               $elemMatch: {
    //                 $eq: bearer._id
    //               }
    //             }
    //           },
    //           nearby_users: {
    //             $not: {
    //               $elemMatch: {
    //                 $eq: bearer._id
    //               }
    //             }
    //           },
    //           received_bud_requests: {
    //             $not: {
    //               $elemMatch: {
    //                 $eq: bearer._id
    //               }
    //             }
    //           },
    //           sent_bud_requests: {
    //             $not: {
    //               $elemMatch: {
    //                 $eq: bearer._id
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   ]);

    //   bearer.nearby_users =
    //     [] as unknown[] as mongoose.Types.Array<mongoose.Types.ObjectId>;
    //   nearbyUsers.forEach(async (aggregatedUser) => {
    //     bearer.nearby_users.push(aggregatedUser._id);
    //   });
    // }

    await bearer.save();
    pubsub?.publish(bearer._id.toString(), { subscribeAccount: bearer });

    return bearer;
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
