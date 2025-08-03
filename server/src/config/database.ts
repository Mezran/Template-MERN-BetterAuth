import mongoose from "mongoose";

export const connectToMongoDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-template";

    await mongoose.connect(mongoUri);

    logger.info("[DATABASE] - Connected to MongoDB successfully", {
      uri: mongoUri.replace(/\/\/.*@/, "//***@"), // Hide credentials in logs
      database: mongoose.connection.name,
    });

    // Handle connection events
    mongoose.connection.on("error", (error) => {
      logger.error("[DATABASE] - MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("[DATABASE] - MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("[DATABASE] - MongoDB reconnected");
    });
  } catch (error) {
    logger.error("[DATABASE] - Failed to connect to MongoDB:", error);
    throw error;
  }
};

export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("[DATABASE] - Disconnected from MongoDB");
  } catch (error) {
    logger.error("[DATABASE] - Error disconnecting from MongoDB:", error);
    throw error;
  }
};
