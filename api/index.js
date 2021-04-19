const app = require("./app/app")
const socketio = require("socket.io")
let io
require("./database/mongoose").then((connection) => {
    process.stdout.write("connect mongo successed\n")
    exports.io = io = socketio(app.listen(4000, () => {
        process.stdout.write("API listening on port 4000")
    }), {
        cors: {
            origin: process.env.REQUEST_URL,
            methods: ["GET", "POST"]
        }
    })
}).catch(err => {
    console.error(err)
})
