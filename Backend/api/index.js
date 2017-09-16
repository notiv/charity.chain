const express = require('express');
const router = express.Router();
const EntityRouter = require('./entities/index');

router.use('/entity', EntityRouter);

module.exports = router;