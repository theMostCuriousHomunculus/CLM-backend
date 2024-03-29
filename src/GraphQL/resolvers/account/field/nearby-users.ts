import Account from '../../../../types/interfaces/Account';
import AccountModel from '../../../../mongodb/models/account.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest
) {
  const { bearer } = context;
  if (!bearer || bearer._id.toString() !== parent._id.toString()) {
    return null;
  } else {
    return await AccountModel.find({
      _id: { $in: parent.nearby_users },
      buds: {
        $not: {
          $elemMatch: {
            $eq: parent._id
          }
        }
      },
      received_bud_requests: {
        $not: {
          $elemMatch: {
            $eq: parent._id
          }
        }
      },
      sent_bud_requests: {
        $not: {
          $elemMatch: {
            $eq: parent._id
          }
        }
      }
    });
  }
}
