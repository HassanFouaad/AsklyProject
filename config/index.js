require('dotenv').config()
module.exports = {
    port: process.env.PORT,
    DBString: process.env.DATABASE,
    JWTSecret: process.env.JWTSECRET,
    JWTExpires: process.env.JWTEXPIRE,
    awsAccessKey: process.env.CELLAR_ADDON_KEY_SECRET,
    awsAccessKeyId: process.env.CELLAR_ADDON_KEY_ID,
    awsBucket: process.env.AWS_BUCKET_NAME,
    awsRegion:process.env.CELLAR_ADDON_HOST
  
}