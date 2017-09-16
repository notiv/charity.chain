const Web3 = require('web3');
const config = require('./config');
const logger = require('./logger');
const async = require('async');

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

module.exports.getBlock = (whichBlock, parentCallback) => {
  web3.eth.getBlock(whichBlock || 'latest', (err, result) => {
    if (err || !result) logger.error('Error while getting block.', { whichBlock, err, result });
    parentCallback(err, result);
  });
};

module.exports.unlockAccount = (account, password, parentCallback) => {
  web3.eth.personal.unlockAccount(account, password, 900,
    (err, result) => {
      if (!result && !err) { err = new Error('Account not unlocked.'); }
      if (err) logger.error('Error while trying to unlock account.', { account, password, err, result });
      parentCallback(err, result);
    });
}

module.exports.newAccount = (password, parentCallback) => {
  async.waterfall([
    (callback) => module.exports.unlockAccount(config.ethereum.account, config.ethereum.password, callback),
    (unlocked, callback) => {
      web3.eth.personal.newAccount(password,
        (err, result) => {
          if (err) logger.error('Error while creating new user in Ethereum:', err);
          callback(err, result);
        });
    },
    (address, callback) => {
      web3.eth.sendTransaction({
        from: config.ethereum.account,
        to: address,
        value: web3.utils.toWei(3, 'ether'),
      }, (err, result) => {
        if (err) logger.error('Error while sending initial ethereum to new account.', err);
        callback(err, address);
      });
    },
  ], (err, result) => {
    if (err || !result) logger.error('Error while deploying new user to blockchain.', { err, result });
    parentCallback(err, result);
  });
}

module.exports.deployContract = (contractABI, bytecode, parentCallback) => {
  async.waterfall([
    (callback) => module.exports.unlockAccount(config.ethereum.account, config.ethereum.password, callback),
    (result, callback) => module.exports.getBlock('latest', callback),
    (result, callback) => {
      new web3.eth.Contract(contractABI)
        .deploy({ data: `0x${bytecode}` })
        .estimateGas({ from: config.ethereum.account, gas: result.gasLimit },
        (err, estimatedGas) => {
          if (estimatedGas === result.gasLimit) err = new Error('Unsuficient gas problem.');
          if (err) logger.error('Error while estimating about of gas for smart contract.', err);
          callback(err, estimatedGas);
        });
    },
    (gasLimit) => {
      new web3.eth.Contract(contractABI)
        .deploy({ data: `0x${bytecode}` })
        .send({ from: config.ethereum.account, gasLimit, gasPrice: 1 })
        .on('error', function (err) {
          logger.error('Error while deploying new contract.', { err, gasLimit, gasPrice: 1 });
          parentCallback(err, null);
        })
        .then(function (newContractInstance) {
          parentCallback(null, newContractInstance.options.address);
        });
    },
  ]);
}

module.exports.pendingTransactionBroadcast = (parentCallback) => {
  web3.eth.getBlock(
    'pending',
    function (err, result) {
        if (err) {
          logger.error('Error occurred while getting pending transactions', err);
          parentCallback(err, null);
        } else {
          parentCallback(null, result);
        }
    });
};

module.exports.recallContract = (address, abi) => {
  return new web3.eth.Contract(abi, address);
}
