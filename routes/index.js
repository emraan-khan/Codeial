const express = require('express');

const router = express.Router();
const homeController = require('../controller/home__controller');

console.log('Router Loaded.')

router.get('/', homeController.home);
router.use('/users',require('./user'))
router.use('/posts', require('./posts'))
router.use('/comments',require('./comment'))

router.use('/api', require('./api'))

module.exports = router;