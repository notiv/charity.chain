const express = require('express');
const router = express.Router();
const EntetyController = require('./controller');

router.get('/', EntetyController.getAll);
router.get('/:id', EntetyController.getSingle);
router.post('/', EntetyController.create);
router.put('/:id', EntetyController.update);
router.delete('/:id', EntetyController.delete);

module.exports = router;