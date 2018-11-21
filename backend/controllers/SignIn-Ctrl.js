'use strict';

const { dbSignIn } = require('../models/Account');

module.exports.signIn = (req, res, next) => {
  dbSignIn(req, res, next).then(data => {
    res.json(data); //need to go back to frontend now
  });
};
