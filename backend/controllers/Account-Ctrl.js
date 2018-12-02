'use strict';

const { dbGetOneAccount, dbPostOneAccount, dbSignIn } = require('../models/Account');

module.exports.getSingleAccount = (req, res, next) => {
  let id = req.params.id;
  dbGetOneAccount(req, res, id, next)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.postAccount = (req, res, next) => {
  dbPostOneAccount(req, res, next)
    .then(token => {
      res.send(token);
    })
    .catch(err => {
      next(err);
    });
};
