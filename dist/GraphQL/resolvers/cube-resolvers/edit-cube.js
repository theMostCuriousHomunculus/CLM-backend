import HttpError from '../../../models/http-error.js';
const validCubeProperties = ['description', 'name', 'published'];
export default async function (parent, args, context) {
  const { account, cube, pubsub } = context;
  if (!account || !cube || account._id.toString() !== cube.creator.toString())
    throw new HttpError('You are not authorized to edit this cube.', 401);
  for (let property of validCubeProperties) {
    if (typeof args[property] !== 'undefined') cube[property] = args[property];
  }
  await cube.save();
  pubsub.publish(cube._id.toString(), { subscribeCube: cube });
  return cube;
}
//# sourceMappingURL=edit-cube.js.map
