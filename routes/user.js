const express = require('express');

const router = express.Router();
const passport = require('passport')
const userController = require('../controller/user_controller');

router.get('/profile',passport.checkAuthentication,userController.user);

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'},
),userController.createSession)

module.exports= router;