import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, RequestHandler, Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';

import pubsub from './GraphQL/pubsub.js';
import AccountModel, { Account } from './models/account-model.js';
import BlogPostModel, { BlogPost } from './models/blog-post-model.js';
import CubeModel, { Cube } from './models/cube-model.js';
import DeckModel, { Deck } from './models/deck-model.js';
import EventModel, {
  Event,
  Player as EventPlayer
} from './models/event-model.js';
import MatchModel, {
  Match,
  MatchCard,
  Player as MatchPlayer
} from './models/match-model.js';

interface ModifiedRequest extends Request {
  account?: Account | null;
  blogPost?: BlogPost | null;
  cube?: Cube | null;
  deck?: Deck | null;
  event?: Event | null;
  match?: Match | null;
  player?: EventPlayer | MatchPlayer | null;
  pubsub?: PubSub | null;
  token?: string | null;
}

export default <RequestHandler>(
  async function (req: ModifiedRequest, res: Response, next: NextFunction) {
    try {
      if (req.header('Authorization')) {
        const token = req.header('Authorization')!.replace('Bearer ', '');
        const decodedToken = <JwtPayload>(
          jwt.verify(token, process.env.JWT_SECRET!)
        );
        const account = await AccountModel.findById(decodedToken._id);

        req.account = account;
        req.token = token;
      }

      if (req.header('BlogPostID')) {
        const blogPost = await BlogPostModel.findById(req.header('BlogPostID'));
        req.blogPost = blogPost;
      }

      if (req.header('CubeID')) {
        const cube = await CubeModel.findById(req.header('CubeID'));
        req.cube = cube;
      }

      if (req.header('DeckID')) {
        const deck = await DeckModel.findById(req.header('DeckID'));
        req.deck = deck;
      }

      if (req.header('EventID')) {
        const event = await EventModel.findOne({
          _id: req.header('EventID'),
          players: { $elemMatch: { account: req.account?._id } }
        });
        req.event = event;

        if (event) {
          req.player = event.players.find(
            (plr: EventPlayer) =>
              plr.account.toString() === req.account?._id.toString()
          );
        }
      }

      if (req.header('MatchID')) {
        const match = await MatchModel.findById(req.header('MatchID'));

        for (const plr of match.players) {
          plr.library.sort((a: MatchCard, b: MatchCard) => a.index - b.index);
        }

        req.match = match;

        if (match && req.account) {
          req.player = match.players.find(
            (plr: MatchPlayer) =>
              plr.account.toString() === req.account?._id.toString()
          );
        }
      }

      req.pubsub = pubsub;
    } catch (error) {
      req.account = null;
      req.cube = null;
      req.deck = null;
      req.event = null;
      req.match = null;
      req.player = null;
      req.pubsub = null;
      req.token = null;
    } finally {
      next();
    }
  }
);
