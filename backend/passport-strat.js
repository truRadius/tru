'use strict';

// This module will be executed in app.js.

// module for creating a hash of passwords
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
let sql = require('mssql');
// config for your database
let { config } = require('./config.json');
// initialize the passport-local strategy
const { Strategy } = require('passport-local');
// let User = null;

//******************** Registration authetication *************************
const RegistrationStrategy = new Strategy(
  {
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    const generateHash = password => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
    };

    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        let request = new sql.Request();

        // query to the database and get the data to see if it already exists
        request.query(`select * from Account where Email = ${email} or PhoneNO =${email}`, function(err, recordset) {
          if (recordset) {
            return done(null, false, {
              message: 'That email or Phone number is already taken'
            });
          } else {
            const userPassword = generateHash(password); //function we defined above
            const UserObj = {
              Email: email,
              Password: userPassword,
              FName: req.body.FName,
              LName: req.body.LName,
              Zip: req.body.Zip,
              Account_Type: req.body.Account_Type,
              Gender: req.body.Gender,
              City: req.body.City,
              State: req.body.State,
              PhoneNO: req.body.PhoneNO
            };

            sql.close();
            sql.connect(
              config,
              function(err) {
                if (err) console.log(err);
                let request = new sql.Request();
                request.query(
                  `insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO, AccountCreated) output Inserted.Account_ID values(
            '${UserObj.FName}','${UserObj.LName}','${UserObj.Email}','${UserObj.Zip}','${UserObj.Password}',
            '${UserObj.Account_Type}','${UserObj.Gender}','${UserObj.City}','${UserObj.State}','active',
            '${UserObj.PhoneNO}', SYSDATETIME())`,
                  (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                    return done(null, data);
                  }
                );
              }
            );
          }
        });
      }
    );
  }
);

// login authentication ****************************************
//LOCAL SIGNIN
const LoginStrategy = new Strategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    const isValidPassword = (password, userPass) => {
      // hashes the passed-in password and then compares it to the hashed password fetched from the db
      return bCrypt.compareSync(password, userPass);
    };

    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from Account where email like '${email}' or phoneNO like '${email}'`, function(
          err,
          user
        ) {
          if (err) console.log(err);
          if (!user) {
            return done(null, false, {
              message: "Can't find a user with those credentials. Please try again"
            });
          }
          if (req.body.Email != user.Email || req.body.Email != user.PhoneNO) {
            return done(null, false, {
              message: 'This email/phone number does not match our database'
            });
          }
          if (!isValidPassword(password, user.recordset[0].Password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }
          return done(null, user.recordset[0]);
        });
      }
    );
  }
);

// Passport has to save a user ID in the session to
// manage retrieving the user details when needed.
// It achieves this with the following two methods:

// serialize. In this function, we will be saving the user id to the session in req.session.passport.user
passport.serializeUser((user, done) => {
  // This saves the whole user obj into the session cookie,
  // but typically you will see just user.id passed in.
  done(null, user.Account_ID);
});

// deserialize user
// We use Sequelize's findById to get the user. Then we use the Sequelize getter function, user.get(), to pass a reference to the user to the 'done' function.
passport.deserializeUser(({ id }, done) => {
  console.log('Whats the id here?', id);
  sql.close();
  sql.connect(
    config,
    function(err) {
      if (err) console.log(err);

      // create Request object
      let request = new sql.Request();

      // query to the database and get the data
      request.query(`select * from Account where Account_ID = ${id}`, function(err, user) {
        if (err) console.log(err);
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
    }
  );
});

// Take the new strategies we just created and use them as middleware, so the http requests get piped through them. A POST to register or login will trigger a strategy, because we will call passport.authenticate in the auth ctrl.
// The first argument is optional and it sets the name of the strategy.
passport.use('local-signup', RegistrationStrategy);
passport.use('local-signin', LoginStrategy);
