require("dotenv").config({ path: dirpath + "/.env" })
const express = require("express")
const dirpath = require("../helper/path").dirPath
const checkToken = require("../auth/checkToken")


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