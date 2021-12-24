import mongoose from 'mongoose';

import AccountModel from '../../../../models/account-model.js';
import BlogPostModel from '../../../../models/blog-post-model.js';
import CubeModel from '../../../../models/cube-model.js';
import DeckModel from '../../../../models/deck-model.js';
import EventModel from '../../../../models/event-model.js';
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
