const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: "console",
      timestamp: true,
      colorize: true,
      prettyPrint: true,
    }),
  ],
  exitOnError: false,
})

module.exports = logger;
