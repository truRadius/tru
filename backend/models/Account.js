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

module.exports.dbPostOneAccount = UserObj => {
  console.log('Recieved obj:', UserObj);
  return new Promise((resolve, reject) => {
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);
        let request = new sql.Request();
        //insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO) values('Anna','Banana','a.banana@gmail.com','33647', 'abc123','personal','Female','Tampa','FL', 'active','1231547879');
        request.query(
          `insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO) values(
            '${UserObj.FName}','${UserObj.LName}','${UserObj.Email}','${UserObj.Zip}','${UserObj.Password}',
            '${UserObj.Account_Type}','${UserObj.Gender}','${UserObj.City}','${UserObj.State}','Active',
            '${UserObj.PhoneNO}')`,
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data, '----- DATA');
            resolve(data);
          }
        );
      }
    );
  });
};
