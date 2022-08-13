var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')

router.post('/', brandController.create)
// router.get('/', brandController.getAll) //Error

module.exports = router;