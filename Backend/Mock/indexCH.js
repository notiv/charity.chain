const async = require('async');
const logger = require('../utils/logger');
const Data = require('../api/data/model');
const database = require('../utils/database');
const lineReader = require('line-reader');
const request = require('request');

// SERVER NEEDS TO NATUARALY TURNED ON!

const data = [{
  name: "UNICEF",
  role: "charity",
  geoLocation: {
    lng: 14,
    lat: 46,
  }
}, {
  name: "Red Cross",
  role: "charity",
  geoLocation: {
    lng: 14,
    lat: 46,
  }
}];

async.each(data, (charity, callback) => {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:8080',
    body: charity,
  }
  request(options, (err, res, boy) => {
    if (err) logger.error('Error while sending charity orgarnisation to BC BE.', { err, options });
    callback(err);
  });
});


