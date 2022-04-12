//
// Copyright 2021 DXOS.org
//

import { expect } from 'chai'
import waitForExpect from 'wait-for-expect'

import { firefox, chromium, Browser, Page, BrowserContext } from 'playwright'

import { baseUrl, headless, ignoredLogs, sleep, slowMo, waitUntil } from './utils'

;[chromium].forEach((browserType) => {
  describe(`Balance tab in ${browserType.name()}`, () => {
    let page: Page
    let browser: Browser
    let context: BrowserContext

    const resetBrowserContext = async () => {
      if (page) await page.close()
      if (context) await context.close()
      if (browser) await browser.close()

      browser = await browserType.launch({ headless, slowMo })

      context = await browser.newContext({
        viewport: {
          width: 1280,
          height: 720,
        },
      })
      page = await context.newPage()

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

    before(resetBrowserContext)

    it('Reads the ETH2 staking contract', async () => {
      await page.goto(`${baseUrl}balance`)

      await waitForExpect(async () => {
        expect(await page.isVisible('xpath=//span[contains(text(), "ETH2 staking contract holds:")]')).to.be.true
      })
    })

    after(async () => {
      if (browser) await browser.close()
    })
  })
})
