import jwt from 'jsonwebtoken';

import pubsub from './pubsub.js';
import AccountModel from '../models/account-model.js';
import BlogPostModel from '../models/blog-post-model.js';
import CubeModel from '../models/cube-model.js';
import DeckModel from '../models/deck-model.js';
import EventModel from '../models/event-model.js';
import MatchModel from '../models/match-model.js';
import SubscriptionContext from '../types/interfaces/SubscriptionContext';

export default async function (context: SubscriptionContext) {
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
