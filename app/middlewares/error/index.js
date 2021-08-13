/* eslint-disable no-unused-vars */
const _ = require('lodash');
const {
    prodLogger: logger,
    devLogger
} = require('../../../core/debug');
const {
    ServerError
} = require('../../../core/error')


process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    throw reason;
});

process.on('uncaughtException', (err) => {
    const error = {
        message: err.message,
        stack: err.stack
    };
    logger.error(error);
    // process.exit(1);
});

module.exports = (err, req, res, next) => {
    try {
        if (err.name === 'TypeError' || err.name === 'ReferenceError') {
            logger.error(`Requested URL ${req.originalUrl}, method: ${req.method}`);
            logger.error(`exception Error ${err}`);
            logger.error(`exception Error stack ${err.stack}`);
            // process.exit(1);
        }
        const ErrorObj = new ServerError(err.message, err.status);
        if (!ErrorObj.status) ErrorObj.status = 500;
        if (err.name === 'TokenExpiredError') {
            ErrorObj.status = 403;
            ErrorObj.message = `your session has been expired at ${err.expiredAt}`;
        }

        const error = {
            message: ErrorObj.message,
            requestedUrl: req.url,
            requestedMethod: req.method,
            status: ErrorObj.status,
            stack: ErrorObj.stack,
        };
        devLogger(`${error.message} -- ${error.requestedUrl} -- ${error.requestedMethod}`);
        return res.status(ErrorObj.status).json({
            error: _.pick(error, ['message', 'status'])
        });
    } catch (error) {
        logger.error(error);
        throw error;
    }
};