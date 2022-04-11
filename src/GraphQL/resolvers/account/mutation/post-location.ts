import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import MeasurementSystem from '../../../../types/enums/MeasurementSystem.js';

interface SetLocationArgs {
  latitude: number;
  longitude: number;
}

export default async function (
  parent: any,
  args: SetLocationArgs,
  context: CLMRequest
) {
  const { bearer } = context;
  const { latitude, longitude } = args;

  if (!bearer) {
    throw new HTTPError(
      'You must be logged in to store your location data.',
      409
    );
  }

  bearer.location = {
    coordinates: [longitude, latitude],
    type: 'Point'
  };

  const nearbyUsers = await AccountModel.aggregate([
    {
      $geoNear: {
        distanceField: 'meters_away',
        maxDistance:
          bearer.radius! *
          (bearer.measurement_system === MeasurementSystem.IMPERIAL
            ? 1609.344
            : 1000),
        near: {
          type: 'Point',
          coordinates: [longitude, latitude]
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

  nearbyUsers.forEach(async (aggregatedUser) => {
    bearer.nearby_users.push(aggregatedUser._id);

    if (
      aggregatedUser.meters_away <=
      aggregatedUser.settings.radius *
        (aggregatedUser.settings.measurement_system ===
        MeasurementSystem.IMPERIAL
          ? 1609.344
          : 1000)
    ) {
      const user = await AccountModel.findById(aggregatedUser._id);
      user?.nearby_users.push(bearer._id);
      await user?.save();
    }
  });

  await bearer.save();
  return bearer;
}
