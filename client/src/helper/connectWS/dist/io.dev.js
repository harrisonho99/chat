"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectWS = void 0;

var _socket = require("socket.io-client");

var connectWS = function connectWS() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ws://localhost:4000/socket";
  var socket = (0, _socket.io)(url);
  return socket;
};

exports.connectWS = connectWS;