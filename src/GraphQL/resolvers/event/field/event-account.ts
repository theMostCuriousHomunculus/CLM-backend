import EventPlayer from '../../../../types/interfaces/EventPlayer';
import AccountModel from '../../../../mongodb/models/account.js';

export default async function (parent: EventPlayer) {
  const account = await AccountModel.findById(parent.account);

  return account;
}
