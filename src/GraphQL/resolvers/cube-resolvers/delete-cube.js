import HttpError from '../../../models/http-error.js';

export default async function (parent, args, context) {
  const { account, cube } = context;

  if (!account || !cube || account._id.toString() !== cube.creator.toString())
    throw new HttpError('You are not authorized to edit this cube.', 401);

  await cube.delete();

  return true;
}
