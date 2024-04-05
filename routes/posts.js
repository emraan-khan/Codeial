const express = require('express');
const router= express.Router();
const passport = require('passport');
const postConroller = require('../controller/post_controller');

router.post('/create',passport.checkAuthentication,postConroller.create);

router.get('/destroy/:id', passport.checkAuthentication,postConroller.destroy);

module.exports = router;