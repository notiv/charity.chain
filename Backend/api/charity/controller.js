const logger = require('../../utils/logger');
const Charity = require('../contract/charity');

module.exports.donation = (req, res) => {
  Charity.donation(req, res,
    (err, result) => {
      if(err) {
        logger.error('Error occrred while trying to donate to', { err, body: req.body});
        res.sendStatus(409);
      } else {
        res.sendStatus(200);
      }
  });
};

module.exports.transfer = (req, res) => {
  Charity.transfer(req, res,
  (err, result) => {
    if(err) {
      logger.error('Error occrred while trying to donate to', { err, body: req.body});
      res.sendStatus(409);
    } else {
      res.sendStatus(200);
    }
  });
};
