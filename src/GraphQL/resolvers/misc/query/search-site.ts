import AccountModel from '../../../../models/account-model.js';
import BlogPostModel from '../../../../models/blog-post-model.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import CubeModel from '../../../../models/cube-model.js';
import DeckModel from '../../../../models/deck-model.js';
import EventModel from '../../../../models/event-model.js';

interface SearchSiteArgs {
  search: string;
}

export default async function (
  parent: undefined,
  args: SearchSiteArgs,
  context: CLMRequest
) {
  const { search } = args;
  const { bearer } = context;

  const accounts = await AccountModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const blogPosts = await BlogPostModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const cubes = await CubeModel.find(
    {
      $text: { $search: search },
      $or: [{ published: true }, { creator: bearer?._id }]
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const decks = await DeckModel.find(
    {
      $text: { $search: search },
      $or: [{ published: true }, { creator: bearer?._id }]
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const events = await EventModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  return [...accounts, ...blogPosts, ...cubes, ...decks, ...events];
}
