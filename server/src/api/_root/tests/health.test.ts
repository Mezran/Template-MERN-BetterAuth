// for endpoint /api/health
describe("/api/health", () => {
  describe("GET", () => {
    /*
     *
     * VALID DATA SECTION
     *
     */
    describe("VALID data", () => {
      it("should return 200 status with health information", async () => {
        const response = await global.testRequest.get("/api/health");

        expect(response.status).toBe(200);
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
        const response = await global.testRequest.get("/api/health");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
      });

      it("should have consistent response structure across multiple calls", async () => {
        const responses = await Promise.all([
          global.testRequest.get("/api/health"),
          global.testRequest.get("/api/health"),
          global.testRequest.get("/api/health"),
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

    /*
     *
     * LOGGING TESTS
     *
     */
    describe("Logging", () => {
      it("should log the request to console and MongoDB", async () => {
        // Spy on the logger to verify it's being called
        const loggerSpy = jest.spyOn(global.logger, "info");

        await global.testRequest.get("/api/health");

        // Verify that the request was logged
        expect(loggerSpy).toHaveBeenCalledWith(
          "[REQUEST] GET /api/health",
          expect.any(Object)
        );

        loggerSpy.mockRestore();
      });
    });
  });

  /*
   *
   * ERROR CASES SECTION
   *
   */
  describe("Error cases", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await global.testRequest.get("/api/nonexistent");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Route not found",
        path: "/api/nonexistent",
      });
    });

    it("should log 404 errors", async () => {
      const loggerSpy = jest.spyOn(global.logger, "warn");

      await global.testRequest.get("/api/nonexistent");

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
