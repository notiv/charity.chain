const express = require('express');
const router = express.Router();
const CharityController = require('./controller');

router.post('/donation', CharityController.donation);
router.post('/transaction', CharityController.transaction);

module.exports = router;