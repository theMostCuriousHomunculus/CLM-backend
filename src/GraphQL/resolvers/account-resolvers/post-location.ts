import mongoose from 'mongoose';

import AccountModel from '../../../models/account-model.js';
import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import MeasurementSystem from '../../../types/enums/MeasurementSystem.js';

interface SetLocationArgs {
  latitude: number;
  longitude: number;
}

export default async function (
  parent: any,
  args: SetLocationArgs,
  context: CLMRequest
) {
  const { account } = context;
  const { latitude, longitude } = args;

  if (!account) {
    throw new HTTPError(
      'You must be logged in to store your location data.',
      409
    );
  }

  account.location = {
    coordinates: [longitude, latitude],
    type: 'Point'
  };

  account.settings.location_services = true;

  const nearbyUsers = await AccountModel.aggregate([
    {
      $geoNear: {
        distanceField: 'meters_away',
        maxDistance:
          account.settings.radius *
          (account.settings.measurement_system === MeasurementSystem.IMPERIAL
            ? 1609.344
            : 1000),
        near: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        query: {
          _id: {
            $ne: account._id
          },
          buds: {
            $not: {
              $elemMatch: {
                $eq: account._id
              }
            }
          },
          nearby_users: {
            $not: {
              $elemMatch: {
                $eq: account._id
              }
            }
          },
          received_bud_requests: {
            $not: {
              $elemMatch: {
                $eq: account._id
              }
            }
          },
          sent_bud_requests: {
            $not: {
              $elemMatch: {
                $eq: account._id
              }
            }
          },
          'settings.location_services': true
        }
      }
    }
  ]);

  nearbyUsers.forEach(async (aggregatedUser) => {
    account.nearby_users.push(aggregatedUser._id);

    if (
      aggregatedUser.meters_away <=
      aggregatedUser.settings.radius *
        (aggregatedUser.settings.measurement_system ===
        MeasurementSystem.IMPERIAL
          ? 1609.344
          : 1000)
    ) {
      const user = await AccountModel.findById(aggregatedUser._id);
      user?.nearby_users.push(account._id);
      await user?.save();
    }
  });

  await account.save();
  return account;
}
