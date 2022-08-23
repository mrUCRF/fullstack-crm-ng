const bcriptjs = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
//     res.status(200).json({
//         login: {
//             email: req.body.email,
//             password: req.body.password
//         }
// })  
const candidate = await User.findOne({email: req.body.email})
if (candidate) {
     // if user already exists, verification log & pass
     const passwordResult = bcriptjs.compareSync(req.body.password, candidate.password)
     if(passwordResult) {
        console.log('loginization working!')
        //generate token, passwords matched
        const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id
        }, keys.jwt, {expiresIn: 60 * 60})
        res.status(200).json({
            token: `Bearer ${token}`
        })
     } else {
        res.status(401).json({
            message: 'Passwords do not match, please try again'
        })
     }
} else {
    //user is not found, error
    res.status(404).json({
        message: 'User with that email is not found'
    })
}
}

module.exports.register = async function(req, res) {
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // user.save().then(() => console.log('User has been created'))

    const futureUser = await User.findOne({email : req.body.email})

    if (futureUser) { 
         // if user already exists, send error
         res.status(409).json({
            message: 'This email is already in use. Please, use another'
         })
    } else {
        const salt = bcriptjs.genSaltSync(10)
        const password = req.body.password
        const newUser = new User({
            email: req.body.email,
            password: bcriptjs.hashSync(password, salt)
        })
        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch(error) {
            //handle the error
            errorHandler(res, error)

        }
        
    }
}
 