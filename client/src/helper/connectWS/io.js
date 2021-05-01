import { io } from 'socket.io-client';

export const connectWS = (url, set) => {
  if (set) {
    set(url)
  }
  const socket = io(url, { autoConnect: false });
  return socket;
};
