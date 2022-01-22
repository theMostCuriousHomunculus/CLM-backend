import Account from '../../../../types/interfaces/Account';
import CubeModel from '../../../../mongodb/models/cube.js';

import CLMRequest from '../../../../types/interfaces/CLMRequest';

export default async function (
  parent: Account,
  args: any,
  context: CLMRequest
) {
  const { bearer } = context;
  if (bearer && bearer._id.toString() === parent._id.toString()) {
    return await CubeModel.find({ creator: parent._id });
  } else {
    return await CubeModel.find({ creator: parent._id, published: true });
  }
}
