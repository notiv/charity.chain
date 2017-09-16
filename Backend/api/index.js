const express = require('express');
const router = express.Router();
const EntityRouter = require('./entities/index');
const CharityRouter = require('./charity/index');
const DataRouter = require('./data/index');

router.use('/entity', EntityRouter);
router.use('/charity', CharityRouter);
router.use('/data', DataRouter);

module.exports = router;
