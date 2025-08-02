import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config({ quiet: true });

// Initialize global logger (must be after dotenv config)
import "./logger";
logger.info("[SERVER] - Logger initialized");

import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Health check available at: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Process terminated");
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Process terminated");
  });
});
