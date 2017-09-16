const express = require('express');
const router = express.Router();
const DataController = require('./controller');

router.post('/', DataController.create);
router.get('/tag', DataController.getTags);

/*

 /tags all causes
 /tags/:tag charity for a cause
 /news/:charity news for a charity

*/

module.exports = router;