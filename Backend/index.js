const app = require('express')();
const http = require('http').Server(app);
const bodyparser = require('body-parser');
const config = require('./utils/config');
const logger = require('./utils/logger');
const apiRouter = require('./api/index');
const database = require('./utils/database');
const async = require('async');
const io = require('socket.io')(http);
const ethereum = require('./utils/ethereum');
const CharityContract = require('./api/contract/charity');

app.use(bodyparser());
app.use('/api', apiRouter);

io.on('connection', socket => {
  logger.info('User connected to SocketIO.');
  ethereum.pendingTransactionBroadcast((err, result) => {
    if (err) {
      logger.error('Error occurred while trying to broadcast pending transactions to user.');
    } else {
      if (!result) { result = []; }
      logger.info('Returning pending transaction to user.', result);
      socket.emit('pendingTransactions', JSON.stringify(result));
    }
  });
});

io.on('disconnect', socket => {
  logger.info('User disconected from SocketIO.');
});

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
