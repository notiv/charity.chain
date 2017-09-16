const express = require('express');
const router = express.Router();
const EntetyRouter = require('./enteties/index');

router.use('/entety', EntetyRouter);

module.exports = router;