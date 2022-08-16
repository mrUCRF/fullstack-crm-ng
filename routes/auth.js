const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/auth')
module.exports = router // export local route

router.post('/login', controller.login )

router.post('/register', controller.register )