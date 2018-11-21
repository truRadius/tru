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
      console.log('What is user?', user, msgObj);

      // req.logIn(user, err => { TODO: Log-In the newly registered user
      //   if (err) {
      //     return next(err);
      //   }
      //   console.log('registerMsg', `Thanks for signing up, ${user.firstName}!`);
      // });
      resolve(req.body);
    })(req, res, next);
  });
  // return new Promise((resolve, reject) => {
  //   sql.close();
  //   sql.connect(
  //     config,
  //     function(err) {
  //       if (err) console.log(err);
  //       let request = new sql.Request();
  //       //insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO) values('Anna','Banana','a.banana@gmail.com','33647', 'abc123','personal','Female','Tampa','FL', 'active','1231547879');
  //       request.query(
  //         `insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO, AccountCreated) values(
  //           '${UserObj.FName}','${UserObj.LName}','${UserObj.Email}','${UserObj.Zip}','${UserObj.Password}',
  //           '${UserObj.Account_Type}','${UserObj.Gender}','${UserObj.City}','${UserObj.State}','active',
  //           '${UserObj.PhoneNO}', SYSDATETIME())`,
  //         (err, data) => {
  //           if (err) {
  //             console.log(err);
  //           }
  //           console.log(data, '----- DATA');
  //           resolve(data);
  //         }
  //       );
  //     }
  //   );
  // });
};

module.exports.dbSignIn = signInCreds => {
  console.log('Recieved obj:', signInCreds);
  return new Promise((resolve, reject) => {
    passport.authenticate('local-signin', (err, user, msgObj) => {
      // If login fails, the error is sent back by the passport strategy as { message: "some msg"}
      // console.log('error msg?', msgObj);

      if (err) {
        next(err);
      } //or return next(err) once handler set up in app.js
      if (!user) {
        return res.render('login', msgObj);
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        // console.log('authenticated. Rerouting to welcome!', user);
        console.log(`Welcome back, `, user.FName);
        // TODO: change the loggedin state to true somehow
      });
    })(req, res, next);
  });
};
