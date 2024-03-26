const express = require('express');

const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/profile',userController.user);

router.get('/order',userController.orderRes);

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

module.exports= router;