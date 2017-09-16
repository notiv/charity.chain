const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

const READY_STATE = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

module.exports.initalize = (parentCallback) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.mongoDB.uri, { useMongoClient: true });
  } else {
    logger.info(`Mongoose connection is currently at state: ${READY_STATE[mongoose.connection.readyState]}.`);
  }

  mongoose.connection.on('connected', () => {
    logger.info(`Connected to MongoDB: ${config.mongoDB.uri}`);
    parentCallback(null);
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Error on MongoDB connection: ${config.mongoDB.uri}:`, err);
    parentCallback(err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info(`Disconected from MongoDB: ${config.mongoDB.uri}.`);
  });
}
