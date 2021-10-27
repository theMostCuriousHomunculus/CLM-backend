import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import context from './context.js';
import graphqlHandler from './GraphQL/GRAPHQL-handler.js';
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to MongoDB');
    }
  }
);
const app = express();
const HTTPserver = createServer(app);
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, BlogPostID, CubeID, DeckID, EventID, MatchID'
  );
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(
  express.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
);
app.use(context);
app.use('/graphql', graphqlHandler);
app.use(function (req, res) {
  res.status(404).send();
});
export default HTTPserver;
//# sourceMappingURL=server.js.map
