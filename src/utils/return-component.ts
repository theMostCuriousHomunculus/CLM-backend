import { Types } from 'mongoose';
import HTTPError from '../types/classes/HTTPError.js';

import Cube from '../types/interfaces/Cube';

export default async function (
  cube: Cube,
  componentID: string | Types.ObjectId
) {
  if (componentID === 'mainboard') {
    return cube.mainboard;
  } else if (componentID === 'sideboard') {
    return cube.sideboard;
  } else if (cube.modules.id(componentID)) {
    return cube.modules.id(componentID)!.cards;
  } else if (cube.rotations.id(componentID)) {
    return cube.rotations.id(componentID)!.cards;
  } else {
    throw new HTTPError(
      'Could not find a component with the provided ID in the provided cube.',
      404
    );
  }
}
