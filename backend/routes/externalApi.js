'use strict';

const { Router } = require('express');
const router = Router();

const {
  getDataFromExternalApi,
  getTrialDataFromExternalApi,
  getOrganizationById
} = require('../controllers/ExternalApi-Ctrl');

router.post('/externalApi', getDataFromExternalApi);
router.post('/externalApi/trialData', getTrialDataFromExternalApi);
router.get('/externalApi/:id', getOrganizationById);

module.exports = router;
