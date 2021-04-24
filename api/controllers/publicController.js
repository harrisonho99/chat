const User = require('../model/User');
const Response = require('../helper/Response');
const jwt = require('jsonwebtoken');
module.exports.postSignup = (request, respsonse) => {
  const displayName = request.body.displayName;
  const username = request.body.username;
  const password = request.body.password;
  console.log(request.body);
  //Check if usernam is already existing ?
  User.findOne({ username })
    .exec()
    .then((result) => {
      if (!result) {
        const user = new User({
          displayName,
          username,
          password,
          createAt: new Date(),
        });
        return user
          .save()
          .then((value) => {
            respsonse.json({
              user: value._id,
              message: 'Register sucessful 😘',
            });
          })
          .catch((err) => {
            console.error(err);
            Response.responseWithCode(
              respsonse,
              'some thing was wrong, try again !',
              400
            );
          });
      } else {
        Response.responseWithCode(
          respsonse,
          'usename is already existed 😢',
          200
        );
      }
    })
    .catch((err) => {
      console.log(err);
      Response.responseWithCode(
        respsonse,
        'some thing was wrong, try again !',
        400
      );
    });
};

module.exports.postSignin = (request, respsonse) => {
  const username = request.body.username;
  const password = request.body.password;

  User.findOne({ username, password })
    .select('-password -createAt')
    .exec()
    .then((result) => {
      if (!result) {
        return Response.responseBasic(
          respsonse,
          'Username or password was wrong 😢'
        );
      }
      // respsonse.json({ user: result, message: 'Signin sucessful 😘' });
      const token = jwt.sign({ result }, process.env.JWT_KEY, {
        expiresIn: '30 days',
      });
      respsonse.json({
        user: result,
        token,
        message: 'Signin sucessful 😘',
      });
    })
    .catch((err) => {
      console.error(err);
      return Response.responseBasic(
        respsonse,
        'Username or password was wrong 😢'
      );
    });
};
