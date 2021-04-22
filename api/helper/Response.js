class Response {
  static responseNotfound(res, message = 'NOT FOUND!😫') {
    res.json({ message });
  }
  static responseError(res, message = 'ERROR! 😥') {
    res.json({ message });
  }
  static responseUnAuth(res, message = 'Unauthorized 😥!') {
    res.json({ message });
  }
  static responseBasic(res, message) {
    res.json({ message });
  }
  static responseWithCode(res, message, code) {
    res.status(code).json({ message });
  }
}
module.exports = Response;
