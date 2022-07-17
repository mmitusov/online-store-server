var express = require('express');
var router = express.Router(); 
const UserController = require('../controllers/UserController') 


router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

//This is how we've been testing this path before we've created our controllers paths
//We've mooved our controller to a sepatate folder so we can keep current file clean and readble
/*router.get('/auth', (req, res) => {
    res.json({message: 'Auth is working!'})
})*/

module.exports = router;