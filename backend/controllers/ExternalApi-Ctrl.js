'use strict';
let axios = require('axios');

// const { dbGetOneAccount } = require('../models/Account');

module.exports.getDataFromExternalApi = (req, res, next) => {
  let term = Object.keys(req.body)[0];
  console.log('------------->', term);
  axios
    .post(
      'https://apidata.guidestar.org/essentials/v1',
      { search_terms: term },
      {
        headers: {
          'Subscription-Key': '1bfa55e4bea8456cb36e835dfc215df1',
          'Content-Type': 'application/json'
        }
      }
    )
    .then(result => {
      res.send(result.data.data.hits);
      console.log(result.data.data.hits, 'Data from External API');
    })
    .catch(err => {
      console.log(err);
    });
};
