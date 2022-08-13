var express = require('express');
var router = express.Router();
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)

module.exports = router;