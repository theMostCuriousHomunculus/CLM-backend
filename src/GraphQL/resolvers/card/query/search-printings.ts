import CLMRequest from '../../../../types/interfaces/CLMRequest';
import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';

interface SearchPrintingsArgs {
  oracle_id: string;
}

export default async function (
  parent: undefined,
  args: SearchPrintingsArgs,
  context: CLMRequest
) {
  const { oracle_id } = args;

  return await ScryfallCardModel.find({ oracle_id, lang: 'en' }).sort({
    released_at: -1,
    collector_number: 1
  });
}
