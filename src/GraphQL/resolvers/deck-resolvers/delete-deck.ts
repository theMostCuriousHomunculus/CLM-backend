import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import MatchModel from '../../../models/match-model.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account, deck } = context;

  if (!deck) {
    throw new HTTPError('Could not find a deck with the provided ID.', 404);
  }

  if (!account || account._id !== deck.creator) {
    throw new HTTPError('You are not authorized to edit this deck.', 401);
  }

  await MatchModel.deleteMany({ deck: deck._id });

  await deck.delete();

  return true;
}
