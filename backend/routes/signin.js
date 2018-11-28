'use strict';

const { Router } = require('express');
const router = Router();

const { signIn } = require('../controllers/SignIn-Ctrl');

router.post('/signin', signIn);

module.exports = router;
