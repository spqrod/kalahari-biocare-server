const winston = require("winston");
require("winston-daily-rotate-file");

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "DD-MM-YYYY (Z) HH:mm:ss"
        }),
        winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            level: "error",
            filename: "logs/error-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxFiles: "7d"
        }),
        new winston.transports.DailyRotateFile({
            level: "info",
            filename: "logs/info-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxFiles: "7d"
        }),

    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: "logs/exceptions-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxFiles: "7d"
        })
    ],
    rejectionHandlers: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: "logs/rejections-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            maxFiles: "7d"
        })
    ]
});

exports.logger = logger;