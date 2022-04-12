import { Page } from "playwright";
import { ignoredLogs } from "./constants";

export const addPageDiagnostics = (page: Page) => {
  page.on('console', (msg) => {
    if (msg.type() === 'warning') return
    if (ignoredLogs.some((log) => msg.text()?.includes(log))) return
    console.log(msg.text()) // Logs shown in the browser, will be retransmitted in Node logs as well.
  })
  page.on('pageerror', (e) => {
    // Errors in the browser will error out the playwright tests.
    throw new Error(`Unhandled exception in the page: ${e}`)
  })
}
