const express = require('express');
const router = express.Router();
const HighlightsController = require('./controller');

router.get('/', HighlightsController.getAll);

module.exports = router;