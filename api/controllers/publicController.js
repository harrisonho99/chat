const User = require('../model/User');
const Response = require('../helper/Response');

module.exports.postSignup = (req, res) => {
  console.log(req.body);
  const user = new User({
    displayName: req.body.displayName,
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((value) => {
      res.json({ user: value._id, message: 'Register sucessful 😘' });
    })
    .catch((err) => {
      console.log(err);
      err.code === 11000
        ? Response.responseWithCode(res, 'usename is already existed 😢', 200)
        : Response.responseWithCode(
            res,
            'some thing was wrong, try again !',
            400
          );
    });
};

module.exports.postSignin = (req, res) => {};
