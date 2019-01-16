'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');

module.exports.dbGetAllCauses = (req, res, next) => {
  console.log('This happens?');
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
