const jwt = require("jsonwebtoken")

const KEY = process.env.JWT_KEY

const omitRoutes = /\/public/

const checkToken = (req, res, next) => {
    if (omitRoutes.test(req.path)) {

        return next()
    }
    let authHeader = req.headers['authorization']
    if (!authHeader) return res.json({ message: "Unauthorized!" })
    const token = authHeader.split(" ")[1]
    try {
        jwt.verify(token, KEY)
    } catch (error) {
        return res.json({ message: "Unauthorized!" })
    }
    return next()
}




module.exports = checkToken