import { Types } from 'mongoose';

import deleteDocumentIDs from '../../../utils/delete-document-ids.js';
import CLMRequest from '../../../types/interfaces/CLMRequest.js';
import Cube from '../../../models/cube-model.js';
import HTTPError from '../../../types/classes/HTTPError.js';

export default async function (parent: any, args: null, context: CLMRequest) {
  const { account, cube } = context;

  if (!account) {
    throw new HTTPError('You must be logged in to clone a cube.', 401);
  }

  if (!cube) {
    throw new HTTPError('Could not find a cube with the provided ID.', 404);
  }

  const copy = JSON.parse(JSON.stringify(cube));

  deleteDocumentIDs(copy);

  const newCubeID = new Types.ObjectId();
  copy._id = newCubeID;
  // cube names must be unique and have a limit of 64 characters (IDs are 24 characters)
  copy.name = `Copy of ${cube.name.slice(0, 29)} - ${newCubeID}`;
  copy.creator = account._id;

  const clonedCube = new Cube(copy);
  await clonedCube.save();

  return clonedCube;
}
