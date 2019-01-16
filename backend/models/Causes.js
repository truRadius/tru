'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');

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
