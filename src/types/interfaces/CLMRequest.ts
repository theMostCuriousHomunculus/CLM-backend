import { Request } from 'express';

import Account from './Account';
import BlogPost from './BlogPost';
import Cube from './Cube';
import Deck from './Deck';
import Event from './Event';
import EventPlayer from './EventPlayer';
import Match from './Match';
import MatchPlayer from './MatchPlayer';

export default interface CLMRequest extends Request {
  bearer?: Account | null;
  blogPost?: BlogPost | null;
  cube?: Cube | null;
  deck?: Deck | null;
  event?: Event | null;
  match?: Match | null;
  player?: EventPlayer | MatchPlayer | null;
  token?: string | null;
}
