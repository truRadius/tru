'use strict';

const { dbGetOneAccount, dbPostOneAccount } = require('../models/Account');

module.exports.getSingleAccount = (req, res, next) => {
  let id = req.params.id;
  dbGetOneAccount(res, id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.postAccount = (req, res, next) => {
  dbPostOneAccount(req, res, next)
    .then(data => {
      res.status(200);
    })
    .catch(err => {
      next(err);
    });
};
