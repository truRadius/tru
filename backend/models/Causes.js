'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
let jwt = require('jsonwebtoken');
let { jwtSecret } = require('../config.json');

module.exports.dbGetAllCauses = (req, res, next) => {
  return new Promise((resolve, reject) => {
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from CausesList`, function(err, data) {
          if (err) console.log('This errrrr', err);
          else {
            console.log('Causes data ----->>', data.recordsets[0]);
            resolve(data.recordsets[0]);
          }
        });
      }
    );
  });
};

module.exports.dbSaveUserCauses = (req, res, next, id) => {
  return new Promise((resolve, reject) => {
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();
        let rowsInserted = 0;
        console.log(req.body.Causes);
        req.body.Causes.forEach(cause => {
          request.query(
            `insert into Causes_TBR(Account_ID, Causes_ID)
Values(${id},(select Causes_ID from CausesList where CauseName = '${cause}')) `,
            function(err, data) {
              if (err) console.log('Error while saving causes to db:', err);
              else rowsInserted++;
            }
          );
        });
        resolve(rowsInserted);
      }
    );
  });
};

module.exports.dbGetUserCauses = (req, res, id) => {
  return new Promise((resolve, reject) => {
    jwt.verify(id, jwtSecret, (err, authData) => {
      if (err) console.log('Error verifying token:', err);
      else {
        sql.close();
        sql.connect(
          config,
          function(err) {
            if (err) console.log(err);

            // create Request object
            let request = new sql.Request();

            // query to the database and get the data
            request.query(
              `select CausesList.ntee_code, CausesList.CauseName from Causes_TBR
              join CausesList
              on Causes_TBR.Causes_ID = CausesList.Causes_ID
              join Account
              on causes_TBR.Account_ID = Account.Account_ID
              where Account.Account_ID=${authData.id}`,
              function(err, data) {
                if (err) console.log(err);
                else {
                  console.log(data);
                  resolve(data.recordset);
                }
              }
            );
          }
        );
      }
    });
  }).catch(err => {
    reject(err);
  });
};
