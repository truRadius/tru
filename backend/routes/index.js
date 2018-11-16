'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./account'));

module.exports = router;
