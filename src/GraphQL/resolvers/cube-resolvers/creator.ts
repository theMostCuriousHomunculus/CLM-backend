import AccountModel from '../../../models/account-model.js';
import Cube from '../../../types/interfaces/Cube';

export default async function (parent: Cube) {
  return await AccountModel.findById(parent.creator);
}
