console.log("test globalSetup.ts");
import dotenv from "dotenv";
import request from "supertest";
import { connectToMongoDB } from "../src/app/config/database";

// Load environment variables for testing
dotenv.config({ path: ".env.test" });

import "../src/app/config/logger";

export default async function globalSetup() {
  console.log("🚀 Starting Jest Global Setup...");

  // Connect to test database
  await connectToMongoDB();
  console.log(`📊 Test MongoDB connected: ${process.env.MONGODB_URI}`);

  // Import app after database connection and logger setup
  const app = (await import("../src/app")).default;

  // Create global testRequest object for the entire test suite
  global.testRequest = request(app);
  console.log("🔗 Global testRequest object created with supertest");

  console.log("✅ Jest Global Setup completed");
}
