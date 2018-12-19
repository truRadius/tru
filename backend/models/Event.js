'use strict';

let sql = require('mssql');
// config for your database
let { config } = require('../config.json');
const passport = require('passport');
let jwt = require('jsonwebtoken');
let { jwtSecret } = require('../config.json');

module.exports.dbPostEvent = (req, res) => {
  return new Promise((resolve, reject) => {
    let id = req.body.currentUser;
    console.log(id);
    jwt.verify(id, jwtSecret, (err, authData) => {
      if (err) {
        res.sendStatus(404);
      } else {
        console.log(authData);
        let eventObj = {
          Event_IMG: req.body.image === '' ? req.body.selectedImage : req.body.uploadedFileCloudinaryUrl,
          Event_Name: req.body.eventName,
          Event_Desc: req.body.eventDescription,
          Street: req.body.street,
          City: req.body.city,
          State: req.body.state,
          Zip: req.body.zipcode,
          Account_ID: authData.id,
          Start_Date: req.body.startDateTime.split('T')[0],
          End_Date: req.body.endDateTime.split('T')[0],
          Start_Time: req.body.startDateTime.split('T')[1],
          End_Time: req.body.endDateTime.split('T')[1]
        };
        console.log(eventObj);
        sql.close();
        sql.connect(
          config,
          function(err) {
            if (err) console.log('This err?', err);

            // create Request object
            let request = new sql.Request();
            res.json(eventObj);
            // query to the database and get the data
            let {
              Event_IMG,
              Event_Name,
              Event_Desc,
              Street,
              City,
              State,
              Zip,
              Account_ID,
              Start_Date,
              End_Date,
              Start_Time,
              End_Time
            } = eventObj;
            request.query(
              `insert into Events(Event_IMG,
              Event_Name,
              Event_Desc,
              Street,
              City,
              State,
              Zip,
              Account_ID,
              Start_Date,
              End_Date,
              Start_Time,
              End_Time) values('${Event_IMG}', '${Event_Name}','${Event_Desc}','${Street}','${City}','${State}',${Zip},'${Account_ID}','${Start_Date}','${End_Date}','${Start_Time}','${End_Time}')`,
              function(err, data) {
                if (err) console.log(err);
                else {
                  resolve(data);
                }
              }
            );
          }
        );
      }
    });
  });
};
