const express = require('express');
const router = express.Router(); //or const router = express();
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
//We've connected all our routers in one index.js file

module.exports = router;