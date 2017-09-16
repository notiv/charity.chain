const express = require('express');
const router = express.Router();
const EntityRouter = require('./entities/index');
const CharityRouter = require('./charity/index');
const HighlightsRouter = require('./highlights/index');

router.use('/entity', EntityRouter);
router.use('/charity', CharityRouter);
router.use('/highlights', HighlightsRouter);

module.exports = router;
