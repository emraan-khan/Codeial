const express = require('express');

const router = express.Router();

const postApi = require('../../../controller/api/v2/posts2_api')

router.get('/',postApi.index2)

module.exports = router;