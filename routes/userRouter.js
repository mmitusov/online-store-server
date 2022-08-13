var express = require('express');
var router = express.Router(); 
const userController = require('../controllers/UserController') 


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

//This is how we've tested this path before - we've created our controllers paths
//We've mooved our controller to a sepatate folder so we can keep current file clean and readble
/*router.get('/auth', (req, res) => {
    res.json({message: 'Auth is working!'})
})*/

module.exports = router;