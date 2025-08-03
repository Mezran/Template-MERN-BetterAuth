# Testing Setup

This project uses Jest and Supertest for comprehensive API testing with real MongoDB database connections.

## Overview

- **Testing Framework**: Jest with TypeScript support
- **HTTP Testing**: Supertest for API endpoint testing
- **Database**: Real MongoDB instance with dedicated test database
- **Logging**: Full Winston logging (console + MongoDB) during tests

## Configuration Files

- `jest.config.js` - Main Jest configuration
- `jest/globalSetup.ts` - Global test setup (database configuration)
- `jest/globalTeardown.ts` - Global test cleanup
- `jest/setup.ts` - Test environment initialization
- `.env.test` - Test environment variables

## Database Strategy

Tests connect to a real MongoDB database using the pattern:

```
{MONGODB_URI}_testingDB
```

For example:

- Development: `mongodb://localhost:27017/mern-template`
- Testing: `mongodb://localhost:27017/mern-template_testingDB`

This ensures:

- Real database behavior testing
- Isolated test data
- Full logging pipeline testing

## Test Structure

```
tests/
├── api/
│   └── _root/
│       └── health.test.ts    # Health endpoint tests
└── testUtils.ts              # Common test utilities
```

Tests are organized in subfolders matching the API structure they're testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test:health
```

## Test Features

### Health Endpoint Tests

- ✅ Status code and response structure validation
- ✅ Content-Type header verification
- ✅ Request logging verification (console + MongoDB)
- ✅ Multiple concurrent request testing
- ✅ 404 error handling and logging

### Logging Verification

Tests verify that requests are properly logged to both:

- Console (with colorized output)
- MongoDB (structured JSON format)

### Test Utilities

The `testUtils.ts` file provides common patterns:

- Health check helpers
- 404 testing utilities
- Response validation helpers
- Test ID generation

## Coverage

Current test coverage:

- **Overall**: ~88% statement coverage
- **API Routes**: 100% coverage
- **App Module**: 100% coverage
- **Database Config**: 72% coverage (some error paths not tested)
- **Logger Config**: 100% coverage

## Environment Variables

Test environment uses `.env.test`:

```env
PORT=3001
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/mern-template_testingDB
LOG_LEVEL=debug
```

## Best Practices

1. **Database Isolation**: Each test suite manages its own database connections
2. **Real Logging**: Tests verify actual logging behavior
3. **Async Cleanup**: Proper connection teardown in test lifecycle
4. **Error Testing**: Both success and error paths are tested
5. **Concurrent Safety**: Tests handle multiple simultaneous requests

## Adding New Tests

1. Create test files in `tests/api/` matching your route structure
2. Use `beforeAll`/`afterAll` for database connection management
3. Import test utilities from `../../../tests/testUtils.ts`
4. Follow the existing pattern for logging verification
5. Test both success and error scenarios
