import { Context } from 'graphql-ws';
import { PubSub } from 'graphql-subscriptions';

import Account from './Account';
import BlogPost from './BlogPost';
import Cube from './Cube';
import Deck from './Deck';
import Event from './Event';
import Match from './Match';

export default interface ExtendedContext extends Context {
  account?: Account | null;
  blogPost?: BlogPost | null;
  cube?: Cube | null;
  deck?: Deck | null;
  event?: Event | null;
  match?: Match | null;
  pubsub?: PubSub | null;
}
