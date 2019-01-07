'use strict';

const { Router } = require('express');
const router = Router();

const { createEvent, getSingleEvent } = require('../controllers/Event-Ctrl');

router.post('/event', createEvent);
router.post('/event/:id', getSingleEvent);

module.exports = router;
