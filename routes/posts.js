const express = require('express');
const router= express.Router();

const postConroller = require('../controller/post_controller');

router.post('/create',postConroller.create);

module.exports = router;