const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const ordersRoutes = require('./routes/orders')
const positionsRoutes = require('./routes/positions')
const passport = require('passport')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI).then(() => {
    console.log('MongoDB is connected')
}).catch(err => console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(require('cors')())
app.use('/uploads', express.static('uploads')) //доступ к картинкам  напрямую
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/positions', positionsRoutes)


module.exports = app  