const Entity = require('./model');
const logger = require('../../utils/logger');
const charity = require('../contract/charity');
const eth = require('../../utils/ethereum');
const async = require('async');

module.exports.getAll = (req, res) => {
  Entity
    .find({})
    .lean()
    .exec((err, result) => {
      if (err) {
        logger.error('Error while returning entities.', { err, result });
        res.sendStatus(409);
      } else {
        res.json(result);
      }
    });
};

module.exports.getSingle = (req, res) => {
  Entity
    .findById(req.params.id)
    .lean()
    .exec((err, result) => {
      if (err) {
        logger.error('Error while returning single entity.', { err, result });
        res.sendStatus(409);
      } else {
        res.json(result);
      }
    });
};

module.exports.create = (req, res) => {
  async.waterfall([
    callback => eth.newAccount('hackzurich', callback),
    (address, callback) => {
      req.body.address = address;
      Entity
        .create(req.body,
        (err, result) => {
          if (err) {
            logger.error('Error while creating new entity inside MongoDB', err);
            res.sendStatus(409);
          } else {
            callback(err, result);
          }
        });
    },
    (entity, callback) => charity.addEntity(entity, callback),
  ], (err, result) => {
    if(err) {
      logger.error('Error in the processs of creating new enity', err);
      res.sendStatus(409);
    } else {
      res.json(result);
    }
  });
};

module.exports.update = (req, res) => {
  Entity
    .findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        logger.error('Error while searcihng and updateing object.', { err, id: req.params.id });
        res.sendStatus(409);
      } else {
        res.json(result);
      }
    });
};

module.exports.delete = (req, res) => {
  Entity
    .findByIdAndRemove(
    req.params.id,
    (err) => {
      if (err) {
        logger.error('Error while deleting entity.', { err, id: req.params.id });
        res.sendStatus(409);
      } else {
        res.sendStatus(200);
      }
    });
};