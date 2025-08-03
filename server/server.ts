import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config({ quiet: true });

// Initialize global logger (must be after dotenv config)
import "./src/logger";
logger.info("[SERVER] - init dotenv");
logger.info("[SERVER] - init logger");

import app from "./src/app";
logger.info(`[SERVER] - init app`);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`[SERVER] - Server is running on port ${PORT}`);
  logger.info(
    `[SERVER] - Health check available at: http://localhost:${PORT}/api/health`
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info(`[SERVER] - SIGTERM received. Shutting down gracefully...`);
  server.close(() => {
    logger.info(`[SERVER] - Process terminated`);
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info(`[SERVER] - SIGINT received. Shutting down gracefully...`);
  server.close(() => {
    logger.info(`[SERVER] - Process terminated`);
    process.exit(0);
  });
});
