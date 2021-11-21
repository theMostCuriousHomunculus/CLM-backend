import { graphqlHTTP } from 'express-graphql';
import { printError } from 'graphql';

import schema from './schema.js';

export default graphqlHTTP(async function () {
  return {
    customFormatErrorFn(error) {
      printError(error);
      return error;
    },
    schema
  };
});
