module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts", "!src/**/*.test.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  setupFilesAfterEnv: ["<rootDir>/jest/setup.ts"],
  globalSetup: "<rootDir>/jest/globalSetup.ts",
  globalTeardown: "<rootDir>/jest/globalTeardown.ts",
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
};
