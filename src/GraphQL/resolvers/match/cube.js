import CubeModel from '../../../mongodb/models/cube.js';

export default async function (parent) {
  const cube = await CubeModel.findById(parent.cube);

  return cube;
}
