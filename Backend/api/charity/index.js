const express = require('express');
const router = express.Router();
const CharityController = require('./controller');

router.post('/donation', CharityController.donation);
router.post('/transfer', CharityController.transfer);

module.exports = router;