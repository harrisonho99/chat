const dirpath = require('../helper/path').dirPath;
require('dotenv').config({ path: dirpath + '/.env' });
const express = require('express');
const checkToken = require('../auth/checkToken');
const app = express();
const httpSever = require('http').createServer(app);
const publicRouter = require('../routers/publicRouter');
const { Server } = require('socket.io');
const cors = require('cors');
var cookieParser = require('cookie-parser');

// allow cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    credentials: true,
  })
);

//parse cookie
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

const io = new Server(httpSever, {
  cors: {
    origin: process.env.REQUEST_URL,
    methods: ['GET', 'POST'],
  },
});
exports.io = io;
let listSection = [];
/* socket middleware  */
io.use((socket, next) => {
  const userID = socket.handshake.auth.userID;
  const displayName = socket.handshake.auth.displayName;
  const sectionID = socket.handshake.auth.sectionID;
  if (sectionID) {
    const section = listSection.find(
      (section) => section.sectionID === sectionID
    );
    if (section) {
      socket.sectionID = sectionID;
      socket.displayName = displayName;
      socket.userID = userID;
      return next();
    }
  }

  if (!userID) return next(new Error('userID is not correct!'));
  socket.userID = userID;
  socket.displayName = displayName;
  socket.sectionID = String(Math.random());
  listSection.push({ sectionID: socket.sectionID });
  console.log(listSection);
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      socketID: id,
      userID: socket.userID,
      displayName: socket.displayName,
    });
  }
  console.log(users);

  //send session
  socket.emit('session', {
    sessionID: socket.sectionID,
    userID: socket.userID,
  });
  // show user curren online
  socket.broadcast.emit('users', users);
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

  socket.on('private message', (data) => {
    console.log({ private: data });
    const { content, receiver } = data;
    socket.to(receiver).to(socket.userID).emit('private message', {
      content,
      sender: socket.userID,
      receiver,
    });
  });

  socket.on('connect_error', (err) => {
    console.error(err);
    if (err.message === 'userID is not correct!') {
      socket.off('connect_error');
    }
  });
});

// log cookie
// app.use((req, _, next) => {
//   console.log(req.cookies);
//   next();
// });

/* express middleware  */
// check token
app.use(checkToken);

// midlewares logic
app.use('/public', publicRouter);

// handle not found resources
app.use((_, res) => {
  res.json({ message: 'Not found 😭' });
});

module.exports = httpSever;
