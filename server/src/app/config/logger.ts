import winston from "winston";
import "winston-mongodb";
import { Logger } from "winston";

// Extend the global namespace to include our logger
declare global {
  var logger: Logger;
}

// MongoDB connection URL from environment or default
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/mern_template";

// Custom format for console logging
const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

// Custom format for MongoDB logging
const mongoFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create transports array
const transports: winston.transport[] = [];

// Console transport
transports.push(
  new winston.transports.Console({
    format: consoleFormat,
    level: "info",
  })
);

// MongoDB transport
transports.push(
  new winston.transports.MongoDB({
    db: MONGODB_URL,
    collection: "logs",
    format: mongoFormat,
    level: "info",
    // Store metadata in the log document
    metaKey: "metadata",
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports,
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
