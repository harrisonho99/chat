import { io } from "socket.io-client"

export const connectWS = (url = "ws://localhost:4000/socket") => {
    const socket = io(url)
    return socket
}