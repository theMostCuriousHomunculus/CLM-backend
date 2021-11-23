import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, RequestHandler, Response } from 'express';

import pubsub from './GraphQL/pubsub.js';
import AccountModel from './models/account-model.js';
import BlogPostModel from './models/blog-post-model.js';
import CLMRequest from './types/interfaces/CLMRequest';
import CubeModel from './models/cube-model.js';
import DeckModel from './models/deck-model.js';
import EventModel from './models/event-model.js';
import EventPlayer from './types/interfaces/EventPlayer';
import MatchCard from './types/interfaces/MatchCard';
import MatchModel from './models/match-model.js';
import MatchPlayer from './types/interfaces/MatchPlayer';

export default <RequestHandler>(
  async function (req: CLMRequest, res: Response, next: NextFunction) {
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
        req.blogPost = await BlogPostModel.findById(req.header('BlogPostID'));
      }

      if (req.header('CubeID')) {
        req.cube = await CubeModel.findById(req.header('CubeID'));
      }

      if (req.header('DeckID')) {
        req.deck = await DeckModel.findById(req.header('DeckID'));
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

        if (!match)
          throw new Error('Unable to find a match with the provided MatchID.');

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
