const app = require("./app/app")
require("./database/mongoose").then((connection) => {
    process.stdout.write("connect mongo successed")
    app.listen(4000, () => {
        process.stdout.write("API listening on port 4000")
    })
}).catch(err => {
    console.error(err)
})
