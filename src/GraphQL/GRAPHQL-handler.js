import { graphqlHTTP } from 'express-graphql';

import schema from './schema.js';

export default graphqlHTTP(async function (req, res, graphQLParams) {
  return {
    customFormatErrorFn(error) {
      if (!error.originalError) {
        console.log(error);
        console.log(graphQLParams.query);
        return error;
      } else {
        const data = error.originalError.data;
        const message = error.message;
        const code = error.originalError.code || 500;
        console.log(error);
        console.log(graphQLParams.query);

        return {
          data,
          message,
          status: code
        };
      }
    },
    // graphiql: { subscriptionEndpoint: `ws://localhost:${process.env.PORT}/subscriptions` },
    // graphiql: true,
    schema
  };
});
