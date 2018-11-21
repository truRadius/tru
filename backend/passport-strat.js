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
let User = null;

//******************** Registration authetication *************************
const RegistrationStrategy = new Strategy(
  {
    usernameField: 'Email',
    passwordField: 'Password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    console.log('Registration Strategy:', email, password);
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
        request.query(`select * from Account where Email = ${email}`, function(err, recordset) {
          if (err) console.log('This the error?', err);
          console.log('Recordset---->', recordset);
          if (recordset) {
            return done(null, false, {
              message: 'That email is already taken'
            });
          } else {
            const userPassword = generateHash(password); //function we defined above
            const UserObj = {
              Email: email,
              Password: userPassword,
              FName: req.body.FName,
              LName: req.body.LName
            };

            sql.close();
            sql.connect(
              config,
              function(err) {
                if (err) console.log(err);
                let request = new sql.Request();
                //insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO) values('Anna','Banana','a.banana@gmail.com','33647', 'abc123','personal','Female','Tampa','FL', 'active','1231547879');
                request.query(
                  `insert into Account (FName, LName, Email, Zip, Password, Account_Type, Gender, City, State, Status, PhoneNO, AccountCreated) values(
            '${UserObj.FName}','${UserObj.LName}','${UserObj.Email}','${UserObj.Zip}','${UserObj.Password}',
            '${UserObj.Account_Type}','${UserObj.Gender}','${UserObj.City}','${UserObj.State}','active',
            '${UserObj.PhoneNO}', SYSDATETIME())`,
                  (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(data, '----- DATA');
                    return done(null, data, null);
                    // return data;
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
    sql.close();
    sql.connect(
      config,
      function(err) {
        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the data
        request.query(`select * from Account where email like ${email} or phoneNO like ${email}`, function(err, user) {
          if (err) console.log(err);
          if (!user) {
            return done(null, false, {
              message: "Can't find a user with those credentials. Please try again"
            });
          }
          if (req.body.username != user.Email) {
            return done(null, false, {
              message: 'This email/phone number does not match our database'
            });
          }
          if (!isValidPassword(user.Password, password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }
        });
      }
    );
    // User.findOne({ where: { email } })
    //   .then(user => {
    //     if (!user) {
    //       return done(null, false, {
    //         message: "Can't find a user with those credentials. Please try again"
    //       });
    //     }
    //     if (req.body.username != user.username) {
    //       return done(null, false, {
    //         message: 'This email/phone number does not match our database'
    //       });
    //     }
    //     if (!isValidPassword(user.password, password)) {
    //       return done(null, false, {
    //         message: 'Incorrect password.'
    //       });
    //     }
    //     const userinfo = user.get();
    //     return done(null, userinfo);
    //   })
    //   .catch(err => {
    //     return done(null, false, {
    //       message: 'Something went wrong with your sign in' + err
    //     });
    //   });
  }
);

// Passport has to save a user ID in the session to
// manage retrieving the user details when needed.
// It achieves this with the following two methods:

//serialize. In this function, we will be saving the user id to the session in
// req.session.passport.user
passport.serializeUser((user, done) => {
  // This saves the whole user obj into the session cookie,
  // but typically you will see just user.id passed in.
  done(null, user);
});

// deserialize user
// We use Sequelize's findById to get the user. Then we use the Sequelize getter function, user.get(), to pass a reference to the user to the 'done' function.
passport.deserializeUser(({ id }, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

// Take the new strategies we just created and use them as middleware, so the http requests get piped through them. A POST to register or login will trigger a strategy, because we will call passport.authenticate in the auth ctrl.
// The first argument is optional and it sets the name of the strategy.
passport.use('local-signup', RegistrationStrategy);
passport.use('local-signin', LoginStrategy);
