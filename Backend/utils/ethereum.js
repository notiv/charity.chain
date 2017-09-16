const Web3 = require('web3');
const config = require('./config');
const logger = require('./logger');
const asyn = require('async');

let web3;

module.exports.initalize = (parentCallback) => {
  web3 = new Web3(config.ethereum.uri);
  web3.eth.net.getId((err, result) => {
    if (err) {
      logger.error(`Unable to connect to ethereum network ${config.ethereum.uri}`);
      parentCallback(new Error('No connection to Ethereum'));
    } else {
      logger.info(`Connected to ethereum network ${config.ethereum.uri} with ID ${result}.`);
      parentCallback(null);
    }
  });
}

module.exports.getBlock = (whichBlock, callback) => {
  web3.eth.getBlock(block || 'latest', (err, result) => {
    if (err || !result) { logger.error('Error while getting block.', { whichBlock, err, result }); }
    parentCallback(err, result);
  });
};