import Cube from '../../../models/cube-model.js';
export default async function (parent) {
    const cube = await Cube.findById(parent.cube);
    return cube;
}
//# sourceMappingURL=cube.js.map