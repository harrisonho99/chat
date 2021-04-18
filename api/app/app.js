const express = require("express")
const dirpath = require("../helper/path").dirPath
var admin = require("firebase-admin");
const checkToken = require("../auth/checkToken")
require("dotenv").config({ path: dirpath + "/.env" })

// firebase admin SDK
var serviceAccount = require(dirpath + "/chat-test-f624b-firebase-adminsdk-optsp-85b218d62b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const defaultAuth = admin.auth()

const app = express()


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


module.exports = app