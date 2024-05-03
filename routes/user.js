const express = require('express');

const router = express.Router();
const passport = require('passport')
const userController = require('../controller/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'},
),userController.createSession)

router.get('/signOut',userController.destroySession);

// this route will take me to google page and fetch data from there
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// another url will take me back with data

router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}), userController.createSession);


module.exports= router;