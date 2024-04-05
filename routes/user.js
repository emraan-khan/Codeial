const express = require('express');

const router = express.Router();
const passport = require('passport')
const userController = require('../controller/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.user);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'},
),userController.createSession)

router.get('/signOut',userController.destroySession);

module.exports= router;