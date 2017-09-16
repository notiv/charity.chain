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

module.exports.addEntity = (entity, parentCallback) => {
  const charityType = {
    donor: 1,
    charity: 2,
    contractor: 3,
    recipient: 4,
  }
  async.waterfall([
    callback => eth.unlockAccount(config.ethereum.account, config.ethereum.password, callback),
    (unlocked, callback) => eth.getBlock('latest', callback),
    (lastBlock, callback) => {
      CharityContract
        .methods
        .addEntity(entity.address, charityType[entity.role])
        .estimateGas({ from: config.ethereum.account, gas: lastBlock.gasLimit },
        (err, result) => {
          if (result === lastBlock.gasLimit) err = new Error('Unsuficient gas problem.');
          if (err) logger.error('Error while estimating about of gas for smart contract.', err);
          callback(err, result);
        });
    },
    (estimatedGas, callback) => {
      CharityContract
        .methods
        .addEntity(entity.address, charityType[entity.role])
        .send({ from: config.ethereum.account, gasLimit: estimatedGas * 5, gasPrice: 1 },
        (err, result) => {
          if (err) logger.error('Error while deploying transaction on BC', err);
          callback(err, result);
        });
    },
  ], (err, result) => parentCallback(err, entity));
};

module.exports.getBalance = (entity, parentCallback) => {
  CharityContract
    .methods
    .getBalance(entity.address)
    .call({ from: config.ethereum.account },
      (err, result) => {
      if (err) {
        logger.error('Error while getting for enity balance.', { err, entity, result });
      } else {
        entity.balance = parseInt(result, 10);
      }
      parentCallback(err, entity);
    });
}

module.exports.donation = (req, res, parentCallback) => {
  async.waterfall([
    callback => eth.unlockAccount(config.ethereum.account, config.ethereum.password, callback),
    (unlocked, callback) => eth.getBlock('latest', callback),
    (lastBlock, callback) => {
      CharityContract
        .methods
        .donate(req.body.to, req.body.amount)
        .estimateGas({ from: config.ethereum.account, gas: lastBlock.gasLimit },
        (err, result) => {
          if (result === lastBlock.gasLimit) err = new Error('Unsuficient gas problem.');
          if (err) logger.error('Error while estimating about of gas for smart contract for danation.', err);
          callback(err, result);
        });
    },
    (estimatedGas, callback) => {
      CharityContract
        .methods
        .donate(req.body.to, req.body.amount)
        .send({ from: config.ethereum.account, gasLimit: estimatedGas * 5, gasPrice: 1 },
        (err, result) => {
          if (err) logger.error('Error while deploying transaction on BC', err);
          callback(err, result);
        });
    },
  ], (err, result) => parentCallback(err, result));
};

module.exports.transfer = (req, res, parentCallback) => {
  async.waterfall([
    callback => eth.unlockAccount(config.ethereum.account, config.ethereum.password, callback),
    (unlocked, callback) => eth.getBlock('latest', callback),
    (lastBlock, callback) => {
      CharityContract
        .methods
        .transfer(req.body.from, req.body.to, req.body.amount)
        .estimateGas({ from: config.ethereum.account, gas: lastBlock.gasLimit },
        (err, result) => {
          if (result === lastBlock.gasLimit) err = new Error('Unsuficient gas problem.');
          if (err) logger.error('Error while estimating about transfer of gas for smart contract.', err);
          callback(err, result);
        });
    },
    (estimatedGas, callback) => {
      CharityContract
        .methods
        .transfer(req.body.from, req.body.to, req.body.amount)
        .send({ from: config.ethereum.account, gasLimit: estimatedGas * 5, gasPrice: 1 },
        (err, result) => {
          if (err) logger.error('Error while deploying transfer transaction on BC', err);
          callback(err, result);
        });
    },
  ], (err, result) => parentCallback(err, result)); 
};
