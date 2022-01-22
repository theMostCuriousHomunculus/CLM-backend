import Cube from '../../../../mongodb/models/cube.js';

interface SearchCubesArgs {
  search: string;
}

export default async function (parent: any, args: SearchCubesArgs) {
  const cubes = await Cube.find(
    { $search: args.search },
    { $meta: 'textScore' }
  );

  return cubes;
}
