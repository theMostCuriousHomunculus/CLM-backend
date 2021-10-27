import deleteDocumentIDs from '../../../utils/delete-document-ids.js';
import Cube from '../../../models/cube-model.js';
import HttpError from '../../../models/http-error.js';
export default async function (parent, args, context) {
  const { account, cube } = context;
  if (!account)
    throw new HttpError('You must be logged in to clone a cube.', 401);
  const copy = JSON.parse(JSON.stringify(cube));
  deleteDocumentIDs(copy);
  copy.creator = account._id;
  copy.name = `Copy of ${cube.name}`;
  const clonedCube = new Cube(copy);
  await clonedCube.save();
  return clonedCube;
}
//# sourceMappingURL=clone-cube.js.map
