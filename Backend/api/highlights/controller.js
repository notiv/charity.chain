const Highlight = require('./model');

module.exports.getAll = (req, res) => {
    Entity
        .find({})
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error('Error while returning highlights.', { err, result });
                res.sendStatus(409);
            } else {
                res.json(result);
            }
        });
};