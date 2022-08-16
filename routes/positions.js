const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/positions')
module.exports = router // export local route

router.get('/:categoryId', controller.getPositionByCategoryId )
router.post('/', controller.createPosition )
router.patch('/:id', controller.editPosition )
router.delete('/:id', controller.updatePosition )
