'use strict';

const { Router } = require('express');
const router = Router();

const { createEvent } = require('../controllers/Event-Ctrl');

router.post('/event', createEvent);

module.exports = router;
