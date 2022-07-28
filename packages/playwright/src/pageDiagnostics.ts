import type { Page } from 'playwright'

/**
 * The logs in the browser that we chose to ignore.
 * They might be valid, but out of scope of the E2E tests.
 */
const ignoredLogs = [
  'Download the React DevTools for a better development experience',
  "Warning: Can't perform a React state update on an unmounted component.",
  '[HMR] Waiting for update signal from WDS',
  '[WDS] Hot Module Replacement enabled',
  '[WDS] Live Reloading enabled',
]

export const addPageDiagnostics = (page: Page) => {
  page.on('console', (msg) => {
    if (msg.type() === 'warning') return
    if (ignoredLogs.some((log) => msg.text()?.includes(log))) return
    console.log(msg.text()) // Logs shown in the browser, will be retransmitted in Node logs as well.
  })
  page.on('pageerror', (/* e */) => {
    // Errors in the browser will error out the playwright tests.
    // throw new Error(`Unhandled exception in the page: ${e}`)
  })
}
