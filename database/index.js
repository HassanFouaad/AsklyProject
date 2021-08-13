const mongoose = require("mongoose");
const {
    prodLogger
} = require("../core/debug");

const connect = async () => {
    try {
        await mongoose
            .connect(process.env.DATABASE, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        prodLogger.info('Mongo DB has been connected')
    } catch (error) {
        console.error(error)
        prodLogger.error(error)

    }
}

module.exports = connect