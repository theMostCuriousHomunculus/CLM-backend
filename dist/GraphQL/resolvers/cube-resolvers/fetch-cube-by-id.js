export default async function (parent, args, context) {
  const { account, cube } = context;
  if (
    (!account || cube.creator._id.toString() !== account._id.toString()) &&
    !cube.published
  ) {
    throw new Error(
      'A cube with the provided ID was not found in our system or it has not yet been published by its creator.'
    );
  } else {
    return context.cube;
  }
}
//# sourceMappingURL=fetch-cube-by-id.js.map
