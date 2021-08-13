const errorHandler = require('./error')
const inputValidator = require('./validator')
const controller = require('./controller')
const {
    isAuthenticated
} = require('./authentication')
module.exports = {
    errorHandler,
    controller,
    inputValidator,
    isAuthenticated
}