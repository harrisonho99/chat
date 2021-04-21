const router = require('express').Router();
const publicController = require('../controllers/publicController');
const User = require('../model/User');


router.post('/signup',publicController.postSignup);

router.post('/login',publicController.postLogin);

module.exports = router;