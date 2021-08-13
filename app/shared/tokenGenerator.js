const jwt = require('jsonwebtoken')


const {
    JWTSecret,
    JWTExpires
} = require('../../config')

const tokenGenerator = (data) => {
    return jwt.sign(data, JWTSecret, {
        expiresIn: JWTExpires
    })
}

module.exports = tokenGenerator