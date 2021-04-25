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
app.use(express.urlencoded({ extended: false }));

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
  const displayName = socket.handshake.auth.displayName
  if (!userID) return next(new Error('userID is not correct!'));
  socket.userID = userID;
  socket.displayName = displayName
  next();
});

io.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      socketID: id,
      id: socket.userID,
      displayName: socket.displayName
    });
  }
  socket.broadcast.emit('users', users);
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });

  socket.on("private message", (data) => {
    console.log(data)
  })


  socket.on("connect_error", (err) => {
    console.log("socket connection err")
    if (err.message === "userID is not correct!") {
      this.usernameAlreadySelected = false;
      socket.off("connect_error");
    }
  });
});







/* express middleware  */
// check token
app.use(checkToken);

// app.use("/private", privateRoute)

// midlewares logic

app.use('/public', publicRouter);



// handle not found resources
app.use((_, res) => {
  res.json({ message: 'Not found 😭' });
});

module.exports = httpSever;
