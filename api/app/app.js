const dirpath = require('../helper/path').dirPath;
require('dotenv').config({ path: dirpath + '/.env' });
const express = require('express');
const checkToken = require('../auth/checkToken');
const app = express();
const httpSever = require('http').createServer(app);
const { Server } = require('socket.io');

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

// midlewares logic
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
