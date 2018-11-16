'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
module.exports.dbGetOneAccount = (res, id) => {
  return new Promise((resolve, reject) => {
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from Account where Account_ID = ${id}`, function(err, recordset) {
          if (err) console.log(err);

          // send data as a response
          res.json(recordset);
        });
      }
    );
  });
};
