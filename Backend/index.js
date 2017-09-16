const express = require('express');
const bodyparser = require('body-parser');
const config = require('./utils/config');
const logger = require('./utils/logger');
const apiRouter = require('./api/index');
const database = require('./utils/database');
const ethereum = require('./utils/ethereum');
const async = require('async');

const app = express();

app.use(bodyparser());
app.use('/api', apiRouter);

async.series([
  callback => database.initalize(callback),
  callback => ethereum.initalize(callback),
], (err) => {
  if (err) {
    logger.error('Unable to start server because initialisation errors', err);
  } else {
    app.listen(config.port, (err) => {
      if (err) {
        logger.error(`Unable to start server on port ${config.port}`, err);
      } else {
        logger.info(`Successfully started server on port ${config.port}`);
      }
    });
  }
});
