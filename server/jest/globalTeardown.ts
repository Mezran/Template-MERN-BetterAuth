const mongoose = require("mongoose");
import { disconnectFromMongoDB } from "../src/app/config/database";

export default async function globalTeardown() {
  console.log("🧹 Starting Jest Global Teardown...");

  try {
    // Drop test database
    await mongoose.connection.db.dropDatabase();
    console.log("🗑️ Dropped test database");
    // Disconnect from MongoDB
    await disconnectFromMongoDB();
    console.log("📊 Disconnected from test MongoDB");

    console.log("✅ Jest Global Teardown completed");
  } catch (error) {
    console.error("❌ Error during Jest Global Teardown:", error);
  }
}
