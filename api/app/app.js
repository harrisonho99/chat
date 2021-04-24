const dirpath = require('../helper/path').dirPath;
require('dotenv').config({ path: dirpath + '/.env' });
const express = require('express');
const checkToken = require('../auth/checkToken');
const app = express();
const httpSever = require('http').createServer(app);
const publicRouter = require('../routers/publicRouter');
const { Server } = require('socket.io');
const cors = require('cors');

const bodyParser = require('body-parser');

// allow cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const io = new Server(httpSever, {
  cors: {
    origin: process.env.REQUEST_URL,
    methods: ['GET', 'POST'],
  },
});
exports.io = io;

/* socket middleware  */
io.use((socket, next) => {
  const userID = socket.handshake.auth.id;

  if (!userID) return next(new Error('userID is not correct!'));
  socket.userID = userID;
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      socketID: id,
      userID: socket.userID,
    });
  }
  socket.emit('users', users);
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

/* express middleware  */
// check token
app.use(checkToken);

// app.use("/private", privateRoute)

// midlewares logic

app.use('/public', publicRouter);

app.use((_, res) => {
  res.json({ message: "you're vetified" });
});

app.use('/', (_, res) => {
  res.json({
    message: 'hello there 👋',
  });
});

// handle not found resources
app.use((_, res) => {
  res.json({ message: 'Not found' });
});

module.exports = httpSever;
