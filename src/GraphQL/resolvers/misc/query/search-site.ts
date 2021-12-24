import AccountModel from '../../../../models/account-model.js';
import BlogPostModel from '../../../../models/blog-post-model.js';
import CubeModel from '../../../../models/cube-model.js';
import DeckModel from '../../../../models/deck-model.js';
import EventModel from '../../../../models/event-model.js';

interface SearchSiteArgs {
  search: string;
}

export default async function (parent: undefined, args: SearchSiteArgs) {
  const { search } = args;

  const accounts = await AccountModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const blogPosts = await BlogPostModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const cubes = await CubeModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const decks = await DeckModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  const events = await EventModel.find(
    { $text: { $search: search } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  return [...accounts, ...blogPosts, ...cubes, ...decks, ...events];
}
