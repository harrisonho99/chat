class Response {
    static responseNotfound(res, content = "NOT FOUND!😫") {
        res.json({ message: content })
    }
    static responseError(res, content = "ERROR! 😥") {
        res.json({ message: content })
    }
    static responseUnAuth(res, content = "Unauthorized 😥!") {
        res.json({ message: content })
    }
    static responseBasic(res, content) {
        res.jon({ message: content })
    }

}
module.exports = Response