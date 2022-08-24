const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router() // create local router
const controller = require('../controllers/category')
module.exports = router // export local route

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategory )
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getById )
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteCategory )
router.post('/', passport.authenticate('jwt', {session: false}),  upload.single('image'), controller.createCategory )
router.patch('/:id', passport.authenticate('jwt', {session: false}),  upload.single('image'), controller.updateCategory )