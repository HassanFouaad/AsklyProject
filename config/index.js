require('dotenv').config()
module.exports = {
    port: process.env.PORT,
    DBString: process.env.DATABASE,
    JWTSecret: process.env.JWTSECRET,
    JWTExpires: process.env.JWTEXPIRE
}