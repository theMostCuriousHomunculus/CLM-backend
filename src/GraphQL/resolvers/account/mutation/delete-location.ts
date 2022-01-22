import mongoose from 'mongoose';

import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer } = context;

  if (!bearer) {
    throw new HTTPError(
      'You must be logged in to clear your location data.',
      409
    );
  }

  bearer.location = undefined;
  bearer.nearby_users =
    [] as unknown[] as mongoose.Types.Array<mongoose.Types.ObjectId>;

  await AccountModel.updateMany(
    {},
    {
      $pull: {
        nearby_users: bearer._id
      }
    }
  );

  await bearer.save();

  return bearer;
}
