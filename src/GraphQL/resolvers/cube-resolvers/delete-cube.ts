import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import EventModel from '../../../models/event-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';
import MatchModel from '../../../models/match-model.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account, cube } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!account || account._id !== cube.creator) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  await EventModel.deleteMany({ cube: cube._id });
  await MatchModel.deleteMany({ cube: cube._id });

  await cube.delete();

  return true;
}
