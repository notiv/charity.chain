const app = require('express')();
const http = require('http').Server(app);
const bodyparser = require('body-parser');
const config = require('./utils/config');
const logger = require('./utils/logger');
const apiRouter = require('./api/index');
const database = require('./utils/database');
// const ethereum = require('./utils/ethereum');
const async = require('async');
const io = require('socket.io')(http);

app.use(bodyparser());
app.use('/api', apiRouter);

// socket.io set up
io.on('connection', socket => {
    // nothing yet

    // test
    const data = {
      someData: ['hello', 'socket'],
    };
    io.emit('test event', data)
});

// API endpoints
app.get('/api/highlights', (req, res) => {
    // TODO
    res.json({});
});

async.series([
  callback => database.initalize(callback),
  // callback => ethereum.initalize(callback),
], (err) => {
  if (err) {
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
