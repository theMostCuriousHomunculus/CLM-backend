import Cube from '../../../models/cube-model.js';

export default async function (parent, args, context) {
  if (
    context.account &&
    context.account._id.toString() === parent._id.toString()
  ) {
    return await Cube.find({ creator: parent._id });
  } else {
    return await Cube.find({ creator: parent._id, published: true });
  }
}
