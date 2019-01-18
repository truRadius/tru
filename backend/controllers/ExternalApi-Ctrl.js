'use strict';
let axios = require('axios');

const { dbGetOneAccount } = require('../models/Account');
const { dbGetUserCauses } = require('../models/Causes');
let { apiKey, premierKey } = require('../config.json');

module.exports.getDataFromExternalApi = (req, res, next) => {
  let body = req.body.data;
  let token = req.body.token;
  dbGetOneAccount(req, res, token).then(data => {
    //get current user's account
    body.filters.geography.zip = data.Zip;
    dbGetUserCauses(req, res, token).then(casueList => {
      //get current user's saved causes
      console.log("User's cause's ntee_codes", casueList);
      let list = [];
      casueList.forEach(cause => {
        list.push(cause.ntee_code);
      });
      body.filters.organization.ntee_major_codes = list;
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
          next(err);
        });
    });
  });
};

module.exports.getTrialDataFromExternalApi = (req, res, next) => {
  let data = req.body;
  axios
    .post('https://apidata.guidestar.org/essentials/v1', data.body, {
      headers: {
        'Subscription-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(result => {
      res.send(result.data.data.hits);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getOrganizationById = (req, res, next) => {
  let orgId = +req.params.id;
  axios
    .get(`https://apidata.guidestar.org/premier/v1/${orgId}`, {
      headers: {
        'Subscription-Key': premierKey
      }
    })
    .then(result => {
      console.log('result---->', result.data.data);
      res.send(result.data.data);
    })
    .catch(err => {
      next(err);
    });
};
