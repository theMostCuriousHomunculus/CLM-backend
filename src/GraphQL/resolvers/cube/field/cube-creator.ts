import AccountModel from '../../../../mongodb/models/account.js';
import Cube from '../../../../types/interfaces/Cube.js';

export default async function (parent: Cube) {
  return await AccountModel.findById(parent.creator);
}
