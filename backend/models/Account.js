'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
const passport = require('passport');
let jwt = require('jsonwebtoken');
let { jwtSecret } = require('../config.json');

module.exports.dbGetOneAccount = (req, res, id) => {
  return new Promise((resolve, reject) => {
    jwt.verify(id, jwtSecret, (err, authData) => {
      if (err) {
        res.sendStatus(404);
      } else {
        console.log(authData);
        sql.close();
        sql.connect(
          config,
          function(err) {
            if (err) console.log('This err?', err);

            // create Request object
            let request = new sql.Request();

            // query to the database and get the data
            request.query(`select * from Account where Account_ID = ${authData.id}`, function(err, data) {
              if (err) console.log(err);
              else {
                console.log(data.recordset[0]);
                resolve(data.recordset[0]);
              }
            });
          }
        );
      }
    });
  });
};

module.exports.dbPostOneAccount = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {
        next(err);
      }
      if (user) {
        console.log('User ID', user.recordset[0].Account_ID);
        let id = user.recordset[0].Account_ID;
        jwt.sign({ id }, jwtSecret, (err, token) => {
          //creating a jwt token for Account_ID to store it on local storage
          if (err) console.log(err);
          resolve({ token, id });
        });
      }
    })(req, res, next);
  });
};

module.exports.dbSignIn = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signin', (err, id, msgObj) => {
      if (err) {
        next(err);
      }
      console.log(id, msgObj.message);
      if (id === false || id === 'false') {
        resolve({ token: false, message: msgObj.message });
      } else {
        jwt.sign({ id }, jwtSecret, (err, token) => {
          //creating a jwt token for Account_ID to store it on local storage
          if (err) console.log(err);
          resolve({ token, message: msgObj.message });
        });
      }
    })(req, res, next);
  });
};

module.exports.dbCheckAccount = (req, res, next) => {
  return new Promise((resolve, reject) => {
    let email = req.query.email;
    console.log('Email', email);
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log('This err?', err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from Account where Email = '${email}'`, function(err, data) {
          if (err) console.log(err);
          else {
            console.log(data.recordset[0]);
            resolve(data.recordset[0]);
          }
        });
      }
    );
  });
};
