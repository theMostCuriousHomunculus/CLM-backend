import Cube from '../../../models/cube-model.js';
export default async function (parent, args) {
    const cubes = await Cube.find({ $search: args.search }, { $meta: 'textScore' });
    return cubes;
}
//# sourceMappingURL=search-cubes.js.map