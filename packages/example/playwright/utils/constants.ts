export const baseUrl = 'http://localhost:8080/';

export const headless = !!process.env.CI // use false for debugging/developing

export const slowMo = process.env.CI ? 0 : 200

export const waitUntil = 'load'

// The logs in the browser that we chose to ignore.
// They might be valid, but out of scope of the E2E tests.
export const ignoredLogs = [
  'Download the React DevTools for a better development experience',
  'Failed prop type: You provided a `value` prop to a form field without an `onChange` handler.',
  'Warning: Can\'t perform a React state update on an unmounted component.',
]
