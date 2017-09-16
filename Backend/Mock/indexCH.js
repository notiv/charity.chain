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
    lng: 54.971600,
    lat: 24.253885,
  }
}, {
  name: "Amnesty Internationals",
  role: "charity",
  geoLocation: {
    lng: 8.537806,
    lat: 47.379068, 
  }
}, {
  name: "Bill and Melinda Gates Foundations",
  role: "charity",
  geoLocation: {
    lng: -74.229737,
    lat: 41.040818,
  }
}];

async.each(data, (charity, callback) => {
  const options = {
    method: 'POST',
    uri: 'http://127.0.0.1:8080/api/entity',
    body: charity,
    json: true,
  }
  request(options, (err, res, boy) => {
    if (err) logger.error('Error while sending charity orgarnisation to BC BE.', { err, options });
    callback(err);
  });
});
