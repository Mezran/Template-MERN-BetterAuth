import mongoose from "mongoose";

export default async function globalTeardown() {
  console.log("🧹 Starting Jest Global Teardown...");

  try {
    // Disconnect from MongoDB if connected
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("📊 Disconnected from test MongoDB");
    }

    console.log("✅ Jest Global Teardown completed");
  } catch (error) {
    console.error("❌ Error during Jest Global Teardown:", error);
  }
}
