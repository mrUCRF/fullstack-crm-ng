const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/orders')
module.exports = router // export local route

router.post('/', controller.getAllOrder )
router.get('/', controller.createOrder )