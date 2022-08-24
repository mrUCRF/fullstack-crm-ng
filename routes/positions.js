const express = require('express')
const router = express.Router() // create local router
const controller = require('../controllers/positions')
module.exports = router // export local route

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getPositionByCategoryId )
router.post('/', passport.authenticate('jwt', {session: false}), controller.createPosition )
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.editPosition )
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.updatePosition )
