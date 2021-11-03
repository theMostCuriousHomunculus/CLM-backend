import jwt from 'jsonwebtoken';
import pubsub from './pubsub.js';
import Account from '../models/account-model.js';
import Blog from '../models/blog-model.js';
import Cube from '../models/cube-model.js';
import Deck from '../models/deck-model.js';
import Match from '../models/match-model.js';
import { Event } from '../models/event-model.js';
export default async function (context) {
  if (context.connectionParams.authToken) {
    const decodedToken = jwt.verify(
      context.connectionParams.authToken,
      process.env.JWT_SECRET
    );
    const account = await Account.findById(decodedToken._id);
    context.account = account;
  }
  if (context.connectionParams.blogPostID) {
    const blogPost = await Blog.findById(context.connectionParams.blogPostID);
    if (!blogPost)
      throw new Error(
        'Could not find a blog post with the provided blogPostID.'
      );
    context.blogPost = blogPost;
  }
  if (context.connectionParams.cubeID) {
    const cube = await Cube.findById(context.connectionParams.cubeID);
    if (!cube)
      throw new Error('Could not find a cube with the provided cubeID.');
    context.cube = cube;
  }
  if (context.connectionParams.deckID) {
    const deck = await Deck.findById(context.connectionParams.deckID);
    if (!deck)
      throw new Error('Could not find a deck with the provided deckID.');
    context.deck = deck;
  }
  if (context.connectionParams.eventID) {
    const event = await Event.findOne({
      _id: context.connectionParams.eventID,
      players: {
        $elemMatch: {
          account: context.account._id
        }
      }
    });
    if (!event)
      throw new Error(
        'An event with that ID does not exist or you were not invited to it.'
      );
    context.event = event;
  }
  if (context.connectionParams.matchID) {
    const match = await Match.findById(context.connectionParams.matchID);
    if (!match)
      throw new Error('Could not find a match with the provided matchID.');
    context.match = match;
  }
  context.pubsub = pubsub;
}
//# sourceMappingURL=subscription-connection.js.map
