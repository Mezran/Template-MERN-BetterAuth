console.log("test globalSetup.ts");
import dotenv from "dotenv";

// Load environment variables for testing
dotenv.config({ path: ".env.test" });

import "../src/app/config/logger";

export default async function globalSetup() {
  console.log("🚀 Starting Jest Global Setup...");

  console.log(`📊 Test MongoDB will use: ${process.env.MONGODB_URI}`);
  console.log("✅ Jest Global Setup completed");
}
