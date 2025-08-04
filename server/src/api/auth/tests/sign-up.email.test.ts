// for endpooint /api/auth/sign-up/email
describe("/api/auth/sign-up/email", () => {
  describe("POST", () => {
    /*
     *
     * INVALID DATA SECTION
     *
     */
    describe("VALID data", () => {
      it("all required fields: should return 200 and a user object", async () => {
        const response = await global.testRequest.post("/api/auth/sign-up/email").send({
          email: "test@example.com",
          password: "Test1234!",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
      });

      it("all required and optional fields: should return 200 and a user object", async () => {
        const userData = {
          email: "test2@example.com",
          password: "Test1234!",
          name: "Test User",
        };
        const response = await global.testRequest
          .post("/api/auth/sign-up/email")
          .send(userData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("email", userData.email);
        expect(response.body.user).toHaveProperty("name", userData.name);
        expect(response.body.user).not.toHaveProperty("password");
      });
    });

    /*
     *
     * INVALID DATA SECTION
     *
     */
    describe("INVALID data", () => {
      // email validation tests
      it("missing email: should return 400", async () => {
        const response = await global.testRequest
          .post("/api/auth/sign-up/email")
          .send({ password: "Test1234!" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("code");
        expect(response.body.code).toBe("INVALID_EMAIL");
      });

      it("invalid email format: should return 400", async () => {
        const response = await global.testRequest
          .post("/api/auth/sign-up/email")
          .send({ email: "invalid-email", password: "Test1234!" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("code");
        expect(response.body.code).toBe("INVALID_EMAIL");
      });

      it("duplicate email: should return 400", async () => {
        // First create the user
        await global.testRequest
          .post("/api/auth/sign-up/email")
          .send({ email: "duplicate@example.com", password: "Test1234!" });

        // Then try to create the same user again
        const response = await global.testRequest
          .post("/api/auth/sign-up/email")
          .send({ email: "duplicate@example.com", password: "Test1234!" });
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty("code");
        expect(response.body.code).toBe("USER_ALREADY_EXISTS");
      });

      // password validation tests
      it("missing password: should return 400", async () => {
        const response = await global.testRequest
          .post("/api/auth/sign-up/email")
          .send({ email: "test@example.com" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("code");
        expect(response.body.code).toBe("INVALID_PASSWORD");
      });
    });
  });
});
