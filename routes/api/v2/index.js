const express = require('express');

const router = express.Router();

router.use('/posts2',require('./posts2'))

module.exports = router;