import logger from "./app/config/logger";
import { Logger } from "winston";

// Extend the global namespace to include our logger
declare global {
  var logger: Logger;
}

// Make logger available globally
global.logger = logger;

export default logger;
