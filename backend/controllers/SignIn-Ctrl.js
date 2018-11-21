'use strict';

const { dbSignIn } = require('../models/Account');

module.exports.signIn = (req, res, next) => {
  dbSignIn().then(data => {
    res.json(data);
  });
};
