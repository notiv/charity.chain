const join = require('path').join;

module.exports = {

  contract: join(__dirname, '../charity.sol'),  

  port: process.env.CHARITY_PORT || 8080,

  mongoDB: {
    uri: process.env.CHARITY_MONGODB_URI || 'mongodb://127.0.0.1:27017',
  },

  ethereum: {
    uri: process.env.CHARITY_ETHEREUM || 'http://127.0.0.1:8545',
    account: process.env.CHARITY_ACCOUNT || '0x7ed536956731bf9267d5dcb5edda732233490ed5',
    password: process.env.CHARITY_PASSWORD || 'hackzurich',
  }

};