import mongoose from 'mongoose';

import AccountModel from '../../../../mongodb/models/account.js';
import BlogPostModel from '../../../../mongodb/models/blog-post.js';
import CubeModel from '../../../../mongodb/models/cube.js';
import DeckModel from '../../../../mongodb/models/deck.js';
import EventModel from '../../../../mongodb/models/event.js';
import HTTPError from '../../../../types/classes/HTTPError.js';

export default function (
  document: mongoose.Document
  // context: any,
  // info: any
) {
  if (document instanceof AccountModel) return 'AccountType';
  if (document instanceof BlogPostModel) return 'BlogPostType';
  if (document instanceof CubeModel) return 'CubeType';
  if (document instanceof DeckModel) return 'DeckType';
  if (document instanceof EventModel) return 'EventType';

  throw new HTTPError('Invalid type.', 500);
}
