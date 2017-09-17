const express = require('express');
const router = express.Router();
const EntityRouter = require('./entities/index');
const CharityRouter = require('./charity/index');
const DataRouter = require('./data/index');
const ethereum = require('../utils/ethereum');

router.use('/entity', EntityRouter);
router.use('/charity', CharityRouter);
router.use('/data', DataRouter);

router.get('/transactions', (req, res) => {
  ethereum.pendingTransactionBroadcast((err, result) => {
    if (err) {
      logger.error('Error while checking pending transactions', err);
      res.sendStatus(409);
    } else {
      res.json(result.transactions);
    }
  })
});

module.exports = router;
