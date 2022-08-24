const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')
const Position = require('../models/Position')

module.exports.getAllCategory = async (req, res) => {
try {
const categoties = await Category.find({
    user: req.user.id
})
res.status(200).json(categoties)
} catch (err) {
    errorHandler(res, err)
}
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
await Category.remove({_id: req.params.id})
await Position.remove({category: req.params.id})
res.status(200).json({
    message: 'Category has deleted'
})
    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports.createCategory = (req, res) => {
    try {

    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports.updateCategory = (req, res) => {
    try {

    } catch (err) {
        errorHandler(res, err)
    }
}