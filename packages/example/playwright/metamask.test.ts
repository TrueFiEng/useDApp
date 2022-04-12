//
// Copyright 2021 DXOS.org
//

import { expect } from 'chai'
import waitForExpect from 'wait-for-expect'

import { firefox, chromium, Browser, Page, BrowserContext } from 'playwright'

import { baseUrl, headless, ignoredLogs, sleep, slowMo, waitUntil } from './utils'

;import { metamaskUrl } from './metamask/constants';
import { MetaMask } from './metamask/MetaMask';
[chromium].forEach((browserType) => {
  describe.only(`Metamask in ${browserType.name()}`, () => {
    let page: Page
    let context: BrowserContext
    let metamask: MetaMask

    const resetBrowserContext = async () => {
      if (page) await page.close()
      if (context) await context.close()

      const pathToExtension = require('path').join(__dirname, 'metamask/metamask-chrome-10.12.4');
      context = await browserType.launchPersistentContext('', { headless, slowMo, args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ] })
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

      metamask = new MetaMask(page)
    }

    before(resetBrowserContext)

    it('Opens and activates metamask popup', async () => {
      // await page.goto(metamaskUrl)
      await metamask.activate()
    })

    // after(async () => {
    //   if (browser) await browser.close()
    // })
  })
})
