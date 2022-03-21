import AccountModel from '../mongodb/models/account.js';
import ScryfallCardModel from '../mongodb/models/scryfall-card.js';

export default async function () {
  const allAccounts = await AccountModel.find();

  for (const account of allAccounts) {
    const avatar = await ScryfallCardModel.aggregate([
      { $sample: { size: 1 } }
    ]);
    account.avatar = avatar[0]._id;
    account.save();
  }
}
