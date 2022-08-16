const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/analytics')
module.exports = router // export local route

router.get('/overview', controller.overview )

router.get('/analytics', controller.analytics )