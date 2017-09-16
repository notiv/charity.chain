const logger = require('../../utils/logger');
const Contract = require('./model');
const solc = require('solc');
const eth = require('../../utils/ethereum');
const config = require('../../utils/config');
const path = require('path');
const fs = require('fs');
const async = require('async');

const name = 'Charity';
let CharityContract;

module.exports.initalize = (parentCallback) => {
  async.waterfall([
    (callback) => {
      Contract
        .findOne({ name })
        .lean()
        .exec((err, result) => {
          if (err) {
            logger.error('Unable to find contract deploying new instance.', { err, result });
            callback(err);
          } else if (!result) {
            logger.info('There is no Charity contract deployed, initalizing new one.');
            callback(false);
          } else {
            CharityContract = eth.recallContract(result.address, result.abi);
            logger.info('We have found deployed Charity contract on Blockchain.');
            callback(true);
          }
        });
    },
    (callback) => {
      fs.readFile(config.contract, 'utf8',
        (err, result) => {
          if (err) logger.error('Error while reading charity.sol', err);
          callback(err, result.toString());
        });
    },
    (contract, callback) => {
      const Charity = solc.compile(contract, 1).contracts[':Charity'];
      const abi = JSON.parse(Charity.interface);
      const bytecode = Charity.bytecode;
      callback(null, abi, bytecode);
    },
    (abi, bytecode, callback) => {
      eth.deployContract(abi, bytecode,
        (err, result) => {
          if (err || !result) logger.error('Unable to deploy contract to Ethereum', err);
          callback(err, abi, result);
        });
    },
    (abi, address, callback) => {
      Contract
        .create({ name, abi, address },
        (err, result) => {
          if (err) logger.error('Error while saving deployed contract', { err, result });
          CharityContract = eth.recallContract(address, abi);
          callback(err);
        });
    },
  ], (err) => {
    if (err && err !== true) {
      logger.error('Error in ethereum deployment flow.', err);
    } else {
      logger.info('Successfully deployed Charity contract to Ethereum network.');
    }
    parentCallback(err);
  });
};