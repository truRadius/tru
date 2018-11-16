'use strict';

// Config
require('dotenv').config();
let port = process.env.PORT || 8000;

// Require third party modules
let express = require('express');
let app = express();
const bodyParser = require('body-parser');

// Require routes
let routes = require('./routes/');

// Setup bodyparser and route middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
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
