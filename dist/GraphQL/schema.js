import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { loadSchema } from '@graphql-tools/load';
import rootResolver from './resolvers/root-resolver.js';
export default addResolversToSchema({
    resolvers: rootResolver,
    schema: await loadSchema('./**/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    })
});
//# sourceMappingURL=schema.js.map