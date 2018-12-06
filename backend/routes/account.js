'use strict';

const { Router } = require('express');
const router = Router();

const { getSingleAccount, postAccount, checkAccount } = require('../controllers/Account-Ctrl');

router.get('/account/check', checkAccount);
router.get('/account/:id', getSingleAccount);
router.post('/account', postAccount);
// router.put('/account/:id', putAccount);

module.exports = router;
