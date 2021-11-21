import Account from '../../../types/interfaces/Account';
import CubeModel from '../../../models/cube-model.js';

import SubscriptionContext from '../../../types/interfaces/SubscriptionContext';

export default async function (
  parent: Account,
  args: any,
  context: SubscriptionContext
) {
  if (
    context.account &&
    context.account._id.toString() === parent._id.toString()
  ) {
    return await CubeModel.find({ creator: parent._id });
  } else {
    return await CubeModel.find({ creator: parent._id, published: true });
  }
}
