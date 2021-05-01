const jwt = require('jsonwebtoken');
const Response = require('../helper/Response');
const KEY = process.env.JWT_KEY;
const METHODS = ['PUT', 'PATCH', 'POST', 'GET', 'DELETE'];
const omitRoutes = /\/public/;

const checkToken = (req, res, next) => {
  if (omitRoutes.test(req.path)) {
    return next();
  }

  try {
    if (METHODS.includes(req.method)) {
      let cookie = req.cookies.persistToken;
      if (!cookie) return Response.responseUnAuth(res);
      const token = cookie.split(' ')[1];
      jwt.verify(token, KEY, (err, decode) => {
        if (err) {
          return console.log(err);
        }
        res.cookie('refreshToken', 'toidetien');
        console.log(decode);
      });
    }
  } catch (error) {
    console.log(error);
    return Response.responseUnAuth(res);
  }
  return next();
};

module.exports = checkToken;
