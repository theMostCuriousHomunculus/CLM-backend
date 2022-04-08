import express from 'express';
import mongoose from 'mongoose';
import webpush from 'web-push';
import { createServer } from 'http';

import context from './context.js';
import graphqlHandler from './GraphQL/GRAPHQL-handler.js';
import pullScryfallData from './utils/pull-scryfall-data.js';
import convertDecks from './utils/convert-decks.js';
import convertAvatars from './utils/convert-avatars.js';

mongoose.connect(process.env.DB_CONNECTION!, {}, (error) => {
  if (error) {
    console.log(`Name: ${error.name}`);
    console.log(`Message: ${error.message}`);
  } else {
    console.log('Connected to MongoDB');
  }
});

webpush.setVapidDetails(
  process.env.FRONT_END_URL!,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const app = express();

const HTTPserver = createServer(app);

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, AccountID, BlogPostID, ConversationID, CubeID, DeckID, EventID, MatchID'
  );
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(context);

app.use('/graphql', graphqlHandler);

// convertAvatars();
// convertDecks();

// pullScryfallData();
// setInterval(pullScryfallData, 43200000);

app.use(function (req, res) {
  res.status(404).send();
});

export default HTTPserver;
