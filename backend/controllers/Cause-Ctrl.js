'use strict';

const { dbGetAllCauses } = require('../models/Causes');

module.exports.getCauses = (req, res, next) => {
  dbGetAllCauses(req, res, next)
    .then(causes => {
      res.status(200).send(causes);
    })
    .catch(err => {
      next(err);
    });
};
