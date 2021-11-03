import HttpError from '../models/http-error.js';

export default async function (cube, componentID) {
  if (componentID === 'mainboard') {
    return cube.mainboard;
  } else if (componentID === 'sideboard') {
    return cube.sideboard;
  } else if (cube.modules.id(componentID)) {
    return cube.modules.id(componentID).cards;
  } else if (cube.rotations.id(componentID)) {
    return cube.rotations.id(componentID).cards;
  } else {
    throw new HttpError(
      'Could not find a component with the provided ID in the provided cube.',
      404
    );
  }
}
