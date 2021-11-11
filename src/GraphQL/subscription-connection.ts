import jwt from 'jsonwebtoken';
import { Context } from 'graphql-ws';
import { PubSub } from 'graphql-subscriptions';

import pubsub from './pubsub.js';
import Account from '../types/interfaces/Account';
import AccountModel from '../models/account-model.js';
import BlogPost from '../types/interfaces/BlogPost';
import BlogPostModel from '../models/blog-post-model.js';
import Cube from '../types/interfaces/Cube';
import CubeModel from '../models/cube-model.js';
import Deck from '../types/interfaces/Deck';
import DeckModel from '../models/deck-model.js';
import Event from '../types/interfaces/Event';
import EventModel from '../models/event-model.js';
import Match from '../types/interfaces/Match';
import MatchModel from '../models/match-model.js';

interface ExtendedContext extends Context {
  account?: Account | null;
  blogPost?: BlogPost | null;
  cube?: Cube | null;
  deck?: Deck | null;
  event?: Event | null;
  match?: Match | null;
  pubsub?: PubSub | null;
}

export default async function (context: ExtendedContext) {
  if (context.connectionParams?.authToken) {
    const decodedToken = jwt.verify(
      context.connectionParams.authToken as string,
      process.env.JWT_SECRET!
    );
    const account = await AccountModel.findById(
      (decodedToken as jwt.JwtPayload)._id
    );

    context.account = account;
  }

  if (context.connectionParams?.blogPostID) {
    const blogPost = await BlogPostModel.findById(
      context.connectionParams.blogPostID
    );

    if (!blogPost)
      throw new Error(
        'Could not find a blog post with the provided blogPostID.'
      );

    context.blogPost = blogPost;
  }

  if (context.connectionParams?.cubeID) {
    const cube = await CubeModel.findById(context.connectionParams.cubeID);

    if (!cube)
      throw new Error('Could not find a cube with the provided cubeID.');

    context.cube = cube;
  }

  if (context.connectionParams?.deckID) {
    const deck = await DeckModel.findById(context.connectionParams.deckID);

    if (!deck)
      throw new Error('Could not find a deck with the provided deckID.');

    context.deck = deck;
  }

  if (context.connectionParams?.eventID) {
    const event = await EventModel.findOne({
      _id: context.connectionParams.eventID as string,
      players: {
        $elemMatch: {
          account: context.account?._id
        }
      }
    });

    if (!event || !context.account)
      throw new Error(
        'An event with that ID does not exist or you were not invited to it.'
      );

    context.event = event;
  }

  if (context.connectionParams?.matchID) {
    const match = await MatchModel.findById(context.connectionParams.matchID);

    if (!match)
      throw new Error('Could not find a match with the provided matchID.');

    context.match = match;
  }

  context.pubsub = pubsub;
}
