const http = require('http')
const app = require('./app')

const {
    prodLogger,
} = require('./core/debug')


const {
    port
} = require('./config')
const connect = require('./database')

const server = http.createServer(app)
connect()
server.listen(port, () => {
    return prodLogger.info(`Nodejs Server is up and running on ${port}`)
})