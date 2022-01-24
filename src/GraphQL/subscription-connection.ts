import jwt from 'jsonwebtoken';

import AccountModel from '../mongodb/models/account.js';
import BlogPostModel from '../mongodb/models/blog-post.js';
import CubeModel from '../mongodb/models/cube.js';
import DeckModel from '../mongodb/models/deck.js';
import EventModel from '../mongodb/models/event.js';
import HTTPError from '../types/classes/HTTPError.js';
// import MatchModel from '../models/match-model.js';
import SubscriptionContext from '../types/interfaces/SubscriptionContext';
import cube from './resolvers/match/cube.js';

export default async function (context: SubscriptionContext) {
  if (context.connectionParams?.authToken) {
    const decodedToken = jwt.verify(
      context.connectionParams.authToken as string,
      process.env.JWT_SECRET!
    );
    context.bearer = await AccountModel.findById(
      (decodedToken as jwt.JwtPayload)._id
    );
  }

  if (context.connectionParams?.blogPostID) {
    const blogPost = await BlogPostModel.findById(
      context.connectionParams.blogPostID
    );

    if (
      !blogPost ||
      (!blogPost.published &&
        blogPost.author.toString() !== context.bearer?._id.toString())
    ) {
      throw new HTTPError(
        'A blog post with the provided blogPostID does not exist or it has not been published by its author yet.',
        404
      );
    }

    context.blogPost = blogPost;
  }

  if (context.connectionParams?.cubeID) {
    const cube = await CubeModel.findById(context.connectionParams.cubeID);

    if (
      !cube ||
      (!cube.published &&
        cube.creator.toString() !== context.bearer?._id.toString())
    ) {
      throw new HTTPError(
        'A cube with the provided cubeID does not exist or it has not been published by its creator yet.',
        404
      );
    }

    context.cube = cube;
  }

  if (context.connectionParams?.deckID) {
    const deck = await DeckModel.findById(context.connectionParams.deckID);

    if (
      !deck ||
      (!deck.published &&
        deck.creator.toString() !== context.bearer?._id.toString())
    ) {
      throw new HTTPError(
        'A deck with the provided deckID does not exist or it has not been published by its creator yet.',
        404
      );
    }

    context.deck = deck;
  }

  if (context.connectionParams?.eventID) {
    const event = await EventModel.findOne({
      _id: context.connectionParams.eventID as string,
      players: {
        $elemMatch: {
          account: context.bearer?._id
        }
      }
    });

    if (!event || !context.bearer) {
      throw new HTTPError(
        'An event with the provided eventID does not exist or you were not invited to it.',
        404
      );
    }

    context.event = event;
  }

  // if (context.connectionParams?.matchID) {
  //   const match = await MatchModel.findById(context.connectionParams.matchID);

  //   if (!match) {
  //     throw new HTTPError(
  //       'A match with the provided matchID does not exist.',
  //       404
  //     );
  //   }

  //   context.match = match;
  // }
}
