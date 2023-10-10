'use strict';
const { createLogger, format, transports } = require('winston');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

// Provide the full path to the log file you want to create
const logFilePath = path.join(__dirname, 'app.log');
const filename = path.basename(logFilePath);

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});

module.exports = { logger };
