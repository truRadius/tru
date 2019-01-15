'use strict';

const { Router } = require('express');
const router = Router();

const { getCauses } = require('../controllers/Cause-Ctrl');

router.get('/causes', getCauses);

module.exports = router;
