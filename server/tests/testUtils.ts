import request from "supertest";
import app from "../src/app";

/**
 * Test utility functions for common testing patterns
 */

export const testUtils = {
  /**
   * Make a request to the health endpoint
   */
  healthCheck: () => request(app).get("/api/health"),

  /**
   * Test if a route returns 404
   */
  testNotFound: (path: string) => request(app).get(path).expect(404),

  /**
   * Wait for a specified amount of time (useful for async operations)
   */
  wait: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Generate a unique test identifier
   */
  generateTestId: () => `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

  /**
   * Common assertions for API responses
   */
  expectValidApiResponse: (response: any, expectedStatus: number = 200) => {
    expect(response.status).toBe(expectedStatus);
    expect(response.headers["content-type"]).toMatch(/json/);
  },

  /**
   * Common assertions for health check responses
   */
  expectValidHealthResponse: (response: any) => {
    testUtils.expectValidApiResponse(response, 200);
    expect(response.body).toEqual({
      status: "OK",
      message: "Server is running",
      timestamp: expect.any(String),
    });

    // Verify timestamp is valid
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).not.toBeNaN();
  },
};

export default testUtils;
