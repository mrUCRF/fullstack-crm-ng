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

module.exports.createCategory = async (req, res) => {
    
    try {
        const category = new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        })
await category.save()
res.status(201).json(category)
    } catch (err) {
        errorHandler(res, err)
    }
}

module.exports.updateCategory = async (req, res) => {
    const updated = {
        name: req.body.name,
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
const category = await Category.findOneAndUpdate(
    {_id: req.params.id}, //обьект откуда беру категорию по айди
    {$set: updated}, // добавляю новые данные в найденную категорию
    {new: true} // сначала изменяю категорию а потом получаю ее в коде
)
res.status(200).json(category)
    } catch (err) {
        errorHandler(res, err)
    }
}