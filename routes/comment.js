const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentContoller = require('../controller/comments_controller');

router.post('/create',passport.checkAuthentication,commentContoller.create);

module.exports = router;