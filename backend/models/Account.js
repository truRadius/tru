'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
const passport = require('passport');

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
  console.log('Recieved obj:', req.body);
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {
        next(err);
      }
      console.log(user);

      // TODO: Log-In the newly registered user

      resolve(user);
    })(req, res, next);
  });
};

module.exports.dbSignIn = (req, res, next) => {
  console.log('Recieved obj:', req.body);
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signin', (err, user, msgObj) => {
      // If login fails, the error is sent back by the passport strategy as { message: "some msg"}
      console.log('error msg?', msgObj);

      if (err) {
        next(err);
      } //or return next(err) once handler set up in app.js

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        console.log('authenticated. Rerouting to welcome!', user);
        resolve(user);
        // TODO: change the loggedin state to true somehow
      });
    })(req, res, next);
  });
};
