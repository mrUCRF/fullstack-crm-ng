const mongoose = require('mongoose')
const User = mongoose.model('users')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //беру токен с header
    secretOrKey: keys.jwt
}

module.exports = (passport) => {

    passport.use(
        new JwtStrategy(options, async (payload, done) => { //added strategy
            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {
                    //if the user was found
                    done(null, user, console.log('Все норм'))
                } else {
                    done(null, false, console.log('This token invalid'))
                }

            } catch (err) {
                done(err, false, console.log('This token invalid'))
            } 
        }) 
    )
} 

