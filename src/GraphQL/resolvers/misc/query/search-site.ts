import AccountModel from '../../../../mongodb/models/account.js';
import BlogPostModel from '../../../../mongodb/models/blog-post.js';
import CLMRequest from '../../../../types/interfaces/CLMRequest';
import CubeModel from '../../../../mongodb/models/cube.js';
import DeckModel from '../../../../mongodb/models/deck.js';
import EventModel from '../../../../mongodb/models/event.js';

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
    {
      $text: { $search: search },
      $or: [{ published: true }, { author: bearer?._id }]
    },
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
