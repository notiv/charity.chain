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
  if (req.query.cause) {
    aggregationPipeling.push(
      {
        $match: { cause: req.query.cause }
      }, {
        $group: {
          _id: '$cause',
          data: { $addToSet: '$$ROOT.charity' },
        }
      }
    );
  } else if (req.query.charity) {
    aggregationPipeling.push(
      {
        $match: { charity: req.query.charity }
      }, {
        $project: {
          text: 1,
        }
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
        $limit: parseInt(req.query.limit) || 5,
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
