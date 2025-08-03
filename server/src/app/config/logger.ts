import winston from "winston";
import { Logger } from "winston";

// Extend the global namespace to include our logger
declare global {
  var logger: Logger;
}
// Custom format for console logging
// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
    return `[${timestamp}] ${level}: ${message} ${metaString}`;
  })
);

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Create the logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === "production" ? "warn" : "debug",
    }),

    // File transports
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    new winston.transports.File({
      filename: "logs/all.log",
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
  // Exit on handled exceptions
  exitOnError: false,
});

// Make logger available globally
global.logger = logger;

export default logger;
