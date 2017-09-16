const express = require('express');
const router = express.Router();
const EntityRouter = require('./entities/index');
const CharityRouter = require('./charity/index');

router.use('/entity', EntityRouter);
router.use('/charity', CharityRouter);

module.exports = router;