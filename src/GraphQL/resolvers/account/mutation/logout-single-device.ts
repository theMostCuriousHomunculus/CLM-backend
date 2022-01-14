import mongoose from 'mongoose';

import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../models/account-model.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

interface LogoutSingleDeviceArgs {
  endpoint?: string;
}

export default async function (
  parent: Account,
  args: LogoutSingleDeviceArgs,
  context: CLMRequest
) {
  const { bearer, token } = context;
  const { endpoint } = args;

  if (!bearer) {
    return false;
  } else {
    bearer.tokens = bearer.tokens.filter((tkn) => {
      return tkn !== token;
    });

    if (endpoint) {
      bearer.push_subscriptions.pull({ endpoint });
    }

    if (bearer.location) {
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
    }

    await bearer.save();
    return true;
  }
}
