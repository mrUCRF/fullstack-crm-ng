const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/orders')
module.exports = router // export local route

router.post('/', passport.authenticate('jwt', {session: false}), controller.getAllOrder )
router.get('/', passport.authenticate('jwt', {session: false}), controller.createOrder )