'use strict';

const { dbSignIn } = require('../models/Account');

module.exports.signIn = (req, res, next) => {
  dbSignIn(req, res, next).then(data => {
    res.send(data); //need to go back to frontend now
  });
};
