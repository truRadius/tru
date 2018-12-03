'use strict';

// Config
require('dotenv').config();
let cors = require('cors');
let port = process.env.PORT || 8000;
let passport = require('passport');
var session = require('express-session');
let bodyParser = require('body-parser');
const flash = require('express-flash');
const expressValidator = require('express-validator');
// Require third party modules
let express = require('express');
let app = express();
let routes = require('./routes/');
let { secret } = require('./config');
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(session(secret));
require('./passport-strat.js');
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  next();
});
// Setup bodyparser and route middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(expressValidator());

app.use('/api', routes);

// Middleware to deal with missed routes
app.use((req, res, next) => {
  let err = new Error('Not found!');
  err.status = 404;
  next(err);
});

// Final error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: 'Unsuccessful',
    err: err.message
  });
});

// Start app
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
