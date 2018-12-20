'use strict';

const { dbPostEvent, dbGetOneEvent } = require('../models/Event');

module.exports.createEvent = (req, res, next) => {
  dbPostEvent(req, res, next)
    .then(event => {
      res.status(200).send(event);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getSingleEvent = (req, res, next) => {
  dbGetOneEvent(req, res, next)
    .then(event => {
      res.status(200).send(event);
    })
    .catch(err => {
      next(err);
    });
};
