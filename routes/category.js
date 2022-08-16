const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/category')
const passport = require('passport')
module.exports = router // export local route

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategory )
router.get('/:id', controller.getById )
router.delete('/:id', controller.deleteCategory )
router.post('/', controller.createCategory )
router.patch('/:id', controller.updateCategory )