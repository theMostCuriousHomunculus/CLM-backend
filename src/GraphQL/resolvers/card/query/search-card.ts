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

  return await ScryfallCardModel.aggregate([
    { $match: { $text: { $search: search }, layout: { $ne: 'art_series' } } },
    { $addFields: { score: { $meta: 'textScore' } } },
    { $sort: { released_at: -1 } },
    { $group: { _id: '$oracle_id', group: { $first: '$$ROOT' } } },
    { $replaceRoot: { newRoot: '$group' } },
    { $sort: { score: -1 } }
  ]);
}
