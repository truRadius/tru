'use strict';

const { Router } = require('express');
const router = Router();

const { getDataFromExternalApi, getTrialDataFromExternalApi } = require('../controllers/ExternalApi-Ctrl');

router.post('/externalApi', getDataFromExternalApi);
router.post('/externalApi/trialData', getTrialDataFromExternalApi);

module.exports = router;
