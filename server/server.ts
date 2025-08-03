console.log("server.ts starting");
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config({ quiet: true });

// Initialize global logger (must be after dotenv config)
import "./src/logger";
logger.info("[SERVER] - init dotenv");
logger.info("[SERVER] - init logger");

import app from "./src/app/app";
logger.info(`[SERVER] - init app`);

// Import database connection
import { connectToMongoDB, disconnectFromMongoDB } from "./src/app/config/database";

const PORT = process.env.PORT || 3000;

// Initialize server with proper startup sequence
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectToMongoDB();
    logger.info("[SERVER] - Database connection established");

    // Start the Express server
    const server = app.listen(PORT, () => {
      logger.info(`[SERVER] - Server is running on port ${PORT}`);
      logger.info(
        `[SERVER] - Health check available at: http://localhost:${PORT}/api/health`
      );
    });

    // Graceful shutdown handlers
    const shutdown = async (signal: string) => {
      logger.info(`[SERVER] - ${signal} received. Shutting down gracefully...`);

      // Close HTTP server
      server.close(async () => {
        logger.info(`[SERVER] - HTTP server closed`);

        try {
          // Disconnect from MongoDB
          await disconnectFromMongoDB();
          logger.info(`[SERVER] - Process terminated gracefully`);
          process.exit(0);
        } catch (error) {
          logger.error(`[SERVER] - Error during shutdown:`, error);
          process.exit(1);
        }
      });

      // Force exit after 10 seconds if graceful shutdown fails
      setTimeout(() => {
        logger.error(`[SERVER] - Forced shutdown after timeout`);
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("[SERVER] - Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
