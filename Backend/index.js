const app = require('express')();
const http = require('http').Server(app);
const bodyparser = require('body-parser');
const config = require('./utils/config');
const logger = require('./utils/logger');
const apiRouter = require('./api/index');
const database = require('./utils/database');
const async = require('async');
const ethereum = require('./utils/ethereum');
const CharityContract = require('./api/contract/charity');
const cors = require('cors');

app.use(cors());
app.use(bodyparser());
app.use('/api', apiRouter);

async.series([
  callback => database.initalize(callback),
  callback => ethereum.initalize(callback),
  callback => CharityContract.initalize(callback),
], (err) => {
  if (err && err !== true) {
    logger.error('Unable to start server because initialisation errors', err);
  } else {
    http.listen(config.port, (err) => {
      if (err) {
        logger.error(`Unable to start server on port ${config.port}`, err);
      } else {
        logger.info(`Successfully started server on port ${config.port}`);
      }
    });
  }
});
