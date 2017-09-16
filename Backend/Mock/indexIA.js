const async = require('async');
const logger = require('../utils/logger');
const Data = require('../api/data/model');
const database = require('../utils/database');
const lineReader = require('line-reader');

database.initalize((err) => {
  if(err) {
    logger.error('Error occurred while connecting with database.');
  } else {
    lineReader.eachLine('AI.data', (line, last, callback) => {
      const lineJSON = JSON.parse(line);
      const data = {};
      if (lineJSON.dateCreated) data.timestamp = lineJSON.dateCreated.$date;
      if (lineJSON.headline) data.headline = lineJSON.headline;
      if (lineJSON.geography) data.geography = lineJSON.geography;
      if (lineJSON.charityOrg) data.charity = lineJSON.charityOrg;
      if (lineJSON.text) data.text = lineJSON.text;
      if (lineJSON.cause) data.cause = lineJSON.cause;
      Data
        .create(data,
        (err, result) => {
          if (err) {
            logger.error('Error while inserting AI data to MongoDB.', err);
          } else {
            logger.info('Successfully inserted data.');
          }
          callback(err);
        });
    });
  }
});


