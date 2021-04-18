const express = require("express")
const app = express()
app.use((_, res) => {
    res.json({
        message: "hello there 👋"
    })
})

module.exports = app