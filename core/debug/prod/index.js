const winston = require('winston');
const fs = require('fs');

let loggerConfig;

// create logs folder if it does not exist
const dir = './logs';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

loggerConfig = {
    level: 'info',
    exitOnError: false,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            prettyPrint: true,
            humanReadableUnhandledException: true,
            handleExceptions: false,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
            ),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
            ),
            handleExceptions: false,
            prettyPrint: true,
            humanReadableUnhandledException: true,
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            handleExceptions: true,
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions.log',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp(),
            ),
            exitOnError: false,
            handleExceptions: true,
            prettyPrint: true,
            humanReadableUnhandledException: true,

        }),
    ],
};

const logger = winston.createLogger(loggerConfig);

module.exports = {
    prodLogger: logger,
};