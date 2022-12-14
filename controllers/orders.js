const Order = require('../models/Order')
const errorHanlder = require('../utils/errorHandler')


module.exports.getAllOrder = async (req, res) => {
    const query = { //будут хранится данные адресной строки для фильтрации отображения
        user: req.user.id
    } 
    if (req.query.start) { //дата старта
        query.date = {
            $gte: req.query.start
        }
    }
    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }
    if (req.query.order) {
        query.order = +req.query.order
    }
    try {
        const orders = await Order
        .find(query)
        .sort({date: -1})
        .skip(+req.query.offset) //нужно для пагинации на фронте :5000/api/order?offset=2&limit=5
        .limit(+req.query.limit)
        res.status(200).json(orders)
    } catch (err) {
    errorHanlder(res, err)
}
}


module.exports.createOrder = async (req, res) => {
    try {
        const lastOrder = await Order
        .findOne({user: req.user.id})
        .sort({date: -1}) //сортировка в порядке убывания

        const maxOrder = lastOrder ? lastOrder.order : 0
const order = await new Order({
list: req.body.list,
user: req.user.id,
order: maxOrder + 1
}).save()
res.status(201).json(order)
    } catch (err) {
        errorHanlder(res, err)
    }
}