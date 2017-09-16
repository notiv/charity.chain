const Data = require('./model');
const logger = require('../../utils/logger');
const async = require('async');

module.exports.create = (req, res) => {
  Data
    .create(req.body,
    (err, result) => {
      if (err) {
        logger.error('Error while creating new data', err);
        res.sendStatus(409);
      } else {
        res.json(result.toJSON());
      }
    });
};

module.exports.getTags = (req, res) => {
  const aggregationPipeling = [];
  if (req.query.tag) {
    aggregationPipeling.push(
      {
        $match: { cause: req.query.tag }
      }, {
        $group: {
          _id: '$cause',
          count: { $sum: 1 },
          data: { $push: '$$ROOT' },
        }
      }, {
        $sort: { count: -1 }
      }, {
        $limit: req.query.limit || 3,
      }
    );
  } else {
    aggregationPipeling.push(
      {
        $group: {
          _id: '$cause',
          count: { $sum: 1 }
        }
      }, {
        $sort: { count: -1 }
      }, {
        $limit: req.query.limit || 5,
      }
    );
  }
  Data
    .aggregate(aggregationPipeling)
    .exec((err, result) => {
      if (err) {
        logger.error('Error occurred while aggregating ', err);
        res.sendStatus(409);
      } else {
        res.json(result);
      }
    });
};
