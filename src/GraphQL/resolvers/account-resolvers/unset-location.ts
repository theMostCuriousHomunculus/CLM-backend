import mongoose from 'mongoose';

import AccountModel from '../../../models/account-model';
import CLMRequest from '../../../types/interfaces/CLMRequest';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account } = context;

  if (!account) {
    throw new HTTPError(
      'You must be logged in to clear your location data.',
      409
    );
  }

  account.location = undefined;
  account.nearby_users =
    [] as unknown[] as mongoose.Types.Array<mongoose.Types.ObjectId>;
  account.settings.location_services = false;

  await AccountModel.updateMany(
    {},
    {
      $pull: {
        nearby_users: account._id
      }
    }
  );

  await account.save();

  return account;
}
