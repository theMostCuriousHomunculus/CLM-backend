import { MongoError } from 'mongodb';

import CLMRequest from '../../../../types/interfaces/CLMRequest.js';
import EventModel from '../../../../mongodb/models/event.js';
import HTTPError from '../../../../types/classes/HTTPError.js';
import MatchModel from '../../../../mongodb/models/match.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { bearer, cube } = context;

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  if (!bearer || bearer._id.toString() !== cube.creator.toString()) {
    throw new HTTPError('You are not authorized to edit this cube.', 401);
  }

  try {
    await EventModel.deleteMany({ cube: cube._id });
    await MatchModel.deleteMany({ cube: cube._id });

    await cube.delete();

    return cube;
  } catch (error) {
    if (error instanceof MongoError) {
      throw new HTTPError(error.message, 500);
    } else if (error instanceof Error) {
      throw new HTTPError(error.message, 500);
    } else {
      throw new HTTPError('An unknown error occurred.', 500);
    }
  }
}
