// require('dotenv').config();

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const accountRouter = require('./routers/account-router');
// const blogRouter = require('./routers/blog-router');
const cubeRouter = require('./routers/cube-router');
const draftRouter = require('./routers/draft-router');
// draft router is handled differently since it utilizes socket.io

const { Draft } = require('./models/draft-model');

mongoose.connect(process.env.DB_CONNECTION, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST');
  next();
});
app.use(express.urlencoded({
  extended: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}));

app.use('/api/account', accountRouter);
// app.use('/api/blog', blogRouter);
app.use('/api/cube', cubeRouter);
app.use('/api/draft', draftRouter(io));

server.listen(port = process.env.PORT || 5000, function () {
    console.log(`Server is up on port ${port}.`);
});