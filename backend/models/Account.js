'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
const passport = require('passport');
let jwt = require('jsonwebtoken');
let { jwtSecret } = require('../config.json');

module.exports.dbGetOneAccount = (res, id) => {
  return new Promise((resolve, reject) => {
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from Account where Account_ID = ${id}`, function(err, recordset) {
          if (err) console.log(err);

          // send data as a response
          res.json(recordset);
        });
      }
    );
    // sql.close();
  });
};

module.exports.dbPostOneAccount = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {
        next(err);
      }
      console.log('User Obj', user);

      // TODO: Log-In the newly registered user
      // req.logIn(user, err => {
      //   if (err) {
      //     return next(err);
      //   }
      // });
      module.exports.dbSignIn(req, res, next).then(token => {
        resolve(token);
      });
    })(req, res, next);
  });
};

module.exports.dbSignIn = (req, res, next) => {
  return new Promise(resolve => {
    passport.authenticate('local-signin', (err, id, msgObj) => {
      if (err) {
        next(err);
      }
      jwt.sign({ id }, jwtSecret, (err, token) => {
        //creating a jwt token for Account_ID to store it on local storage
        if (err) console.log(err);
        resolve(token);
      });

      // req.logIn(user, err => {
      //   if (err) {
      //     return next(err);
      //   }
      // });
    })(req, res, next);
  });
};
