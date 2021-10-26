import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import rootResolver from './resolvers/root-resolver.js';
export default makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: mergeTypeDefs(loadFilesSync(path.join(__dirname, '.'), {
        extensions: ['graphql'],
        recursive: true
    }))
});
//# sourceMappingURL=schema.js.map