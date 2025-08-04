import request from "supertest";
import app from "../../../app";
import { connectToMongoDB, disconnectFromMongoDB } from "../../../app/config/database";

describe("Health Endpoint", () => {
  beforeAll(async () => {
    // Connect to test database
    await connectToMongoDB();
    global.logger.info(
      "[TEST] [health.test.ts] Connected to test database for health endpoint tests"
    );
  });

  afterAll(async () => {
    // Clean up database connection
    await disconnectFromMongoDB();
    global.logger.info("[TEST] [health.test.ts] Disconnected from test database");
  });

  describe("GET /api/health", () => {
    it("should return 200 status with health information", async () => {
      const response = await request(app).get("/api/health").expect(200);

      expect(response.body).toEqual({
        status: "OK",
        message: "Server is running",
        timestamp: expect.any(String),
      });

      // Verify timestamp is a valid ISO string
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it("should return proper content-type header", async () => {
      const response = await request(app)
        .get("/api/health")
        .expect("Content-Type", /json/);

      expect(response.status).toBe(200);
    });

    it("should log the request to console and MongoDB", async () => {
      // Spy on the logger to verify it's being called
      const loggerSpy = jest.spyOn(global.logger, "info");

      await request(app).get("/api/health").expect(200);

      // Verify that the request was logged
      expect(loggerSpy).toHaveBeenCalledWith(
        "GET /api/health",
        expect.objectContaining({
          method: "GET",
          url: "/api/health",
          ip: expect.any(String),
        })
      );

      loggerSpy.mockRestore();
    });

    it("should have consistent response structure across multiple calls", async () => {
      const responses = await Promise.all([
        request(app).get("/api/health"),
        request(app).get("/api/health"),
        request(app).get("/api/health"),
      ]);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("status", "OK");
        expect(response.body).toHaveProperty("message", "Server is running");
        expect(response.body).toHaveProperty("timestamp");
        expect(typeof response.body.timestamp).toBe("string");
      });

      // Verify all timestamps are valid ISO strings
      const timestamps = responses.map((r) => r.body.timestamp);
      timestamps.forEach((timestamp) => {
        const date = new Date(timestamp);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).not.toBeNaN();
      });
    });
  });

  describe("Error cases", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/api/nonexistent").expect(404);

      expect(response.body).toEqual({
        error: "Route not found",
        path: "/api/nonexistent",
      });
    });

    it("should log 404 errors", async () => {
      const loggerSpy = jest.spyOn(global.logger, "warn");

      await request(app).get("/api/nonexistent").expect(404);

      expect(loggerSpy).toHaveBeenCalledWith(
        "404 - Route not found",
        expect.objectContaining({
          path: "/api/nonexistent",
          method: "GET",
        })
      );

      loggerSpy.mockRestore();
    });
  });
});
