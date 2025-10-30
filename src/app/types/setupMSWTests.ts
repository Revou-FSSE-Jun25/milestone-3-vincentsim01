import '@testing-library/jest-dom';

// MSW setup for async testing
import { worker } from '@/__mocks__/browser';

// Start MSW worker before all tests
beforeAll(() => {
  return worker.start({
    onUnhandledRequest: 'warn',
  });
});

// Reset any request handlers after each test
afterEach(() => {
  worker.resetHandlers();
});

// Stop MSW worker after all tests
afterAll(() => {
  worker.stop();
});