var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
router.get('/', brandController.getAll)

module.exports = router;