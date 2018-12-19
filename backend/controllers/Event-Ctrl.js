'use strict';

const { dbPostEvent } = require('../models/Event');

module.exports.createEvent = (req, res, next) => {
  dbPostEvent(req, res, next)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      next(err);
    });
};
