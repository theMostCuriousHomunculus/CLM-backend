import CLMRequest from '../../../../types/interfaces/CLMRequest';
import ScryfallCardModel from '../../../../mongodb/models/scryfall-card.js';

interface SearchCardArgs {
  search: string;
}

export default async function (
  parent: undefined,
  args: SearchCardArgs,
  context: CLMRequest
) {
  const { search } = args;

  return await ScryfallCardModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(25)
    .sort({ released_at: -1 });

  // return await ScryfallCardModel.aggregate([ { $group: { _id: "$oracle_id" } }]);
}
