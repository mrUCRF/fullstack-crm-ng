const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getPositionByCategoryId = async (req, res) => {
try {
const positions = await Position.find({
    category: req.params.categoryId,
    user: req.user.id
})
res.status(200).json(positions)
} catch (e) {
    errorHandler(res, e)
}
}

module.exports.createPosition = async (req, res) => {
    console.log('reqCreate:', req.body)
    try {
        const position = await new Position({
            name: req.body.name,
            cost: +req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
} 

module.exports.deletePosition = async (req, res) => {
    try {
        console.log('Позиция удалена')
await Position.remove({_id: req.params.id})
res.status(200).json({
    message: 'Position has been deleted'
})
    } catch (e) {
        console.log('Позиция не удалена')
        errorHandler(res, e)
    }
}

module.exports.updatePosition = async (req, res) => {
    try {
        const position = await Position.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    } 
}