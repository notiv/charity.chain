const express = require('express');
const router = express.Router();
const DataController = require('./controller');

router.post('/', DataController.create);
router.get('/tag', DataController.getTags);

module.exports = router;