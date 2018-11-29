'use strict';
let axios = require('axios');

const { dbGetOneAccount } = require('../models/Account');

let { apiKey } = require('../config.json');
module.exports.getDataFromExternalApi = (req, res, next) => {
  let term = req.body.search_text;
  let dist = req.body.distance;
  let token = req.body.token;
  dbGetOneAccount(req, res, token).then(data => {
    console.log('------------->', data);
    axios
      .post(
        'https://apidata.guidestar.org/essentials/v1',
        {
          search_terms: term,
          filters: {
            geography: {
              radius: dist,
              zip: data.Zip //TODO: watch the video. Use token to get user's id and get their zip code from it.
            }
          }
        },
        {
          headers: {
            'Subscription-Key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(result => {
        res.send(result.data.data.hits);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
