const router = require('express').Router();
const publicController = require('../controllers/publicController');

router.post('/signup', publicController.postSignup);

router.post('/signin', publicController.postSignin);

module.exports = router;
