const jwt = require("jsonwebtoken")
const Response = require("../helper/Response")
const KEY = process.env.JWT_KEY

const omitRoutes = /\/public/

const checkToken = (req, res, next) => {
    if (omitRoutes.test(req.path)) {
        return next()
    }
    let authHeader = req.headers['authorization']
    if (!authHeader) return Response.responseUnAuth(res)
    const token = authHeader.split(" ")[1]
    try {
        jwt.verify(token, KEY)
    } catch (error) {
        return Response.responseUnAuth(res)
    }
    return next()
}


module.exports = checkToken