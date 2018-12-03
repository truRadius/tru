'use strict';
let axios = require('axios');

const { dbGetOneAccount } = require('../models/Account');

let { apiKey } = require('../config.json');
module.exports.getDataFromExternalApi = (req, res, next) => {
  let body = req.body.data;
  let token = req.body.token;
  dbGetOneAccount(req, res, token).then(data => {
    console.log('------------->', data);
    body.filters.geography.zip = data.Zip;
    console.log('Body from request', body);
    axios
      .post('https://apidata.guidestar.org/essentials/v1', body, {
        headers: {
          'Subscription-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      .then(result => {
        res.send(result.data.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
