import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
  addResolversToSchema,
  makeExecutableSchema
} from '@graphql-tools/schema';
import { loadSchema } from '@graphql-tools/load';

import rootResolver from './resolvers/root-resolver.js';

// export default addResolversToSchema({
//   resolvers: rootResolver,
//   schema: await loadSchema('./**/*.graphql', {
//     loaders: [new GraphQLFileLoader()]
//   })
// });

export default makeExecutableSchema({
  resolvers: rootResolver,
  typeDefs: await loadSchema('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  })
});
