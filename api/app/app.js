const dirpath = require("../helper/path").dirPath
require("dotenv").config({ path: dirpath + "/.env" })
const express = require("express")
const checkToken = require("../auth/checkToken")
const app = express()
const httpSever = require("http").createServer(app)
const { Server } = require("socket.io")

// socket
const io = new Server(httpSever, {
    cors: {
        origin: process.env.REQUEST_URL,
        methods: ["GET", "POST"]
    },
})
exports.io = io
io.on("connection", socket => {
    console.log("a user connected!")
    socket.on("disconnect", () => {
        console.log("a user disconnected!")
    })
})




// check token
app.use(checkToken)



// midlewares logic
app.use((_, res) => {
    res.json({ message: "you're vetified" })
})

app.use("/", (_, res) => {
    res.json({
        message: "hello there 👋"
    })
})







// handle not found resources
app.use((_, res) => {
    res.json({ message: "Not found" })
})


module.exports = httpSever