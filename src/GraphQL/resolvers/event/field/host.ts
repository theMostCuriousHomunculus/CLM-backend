import AccountModel from '../../../../models/account-model.js';
import Event from '../../../../types/interfaces/Event.js';

export default async function (parent: Event) {
  const account = await AccountModel.findById(parent.host);

  return account;
}
