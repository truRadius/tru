'use strict';

const { dbGetOneAccount } = require('../models/Account');

module.exports.getSingleAccount = (req, res, next) => {
  dbGetOneAccount(res)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      next(err);
    });
};
