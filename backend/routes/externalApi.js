'use strict';

const { Router } = require('express');
const router = Router();

const { getDataFromExternalApi } = require('../controllers/ExternalApi-Ctrl');

router.post('/externalApi', getDataFromExternalApi);

module.exports = router;
