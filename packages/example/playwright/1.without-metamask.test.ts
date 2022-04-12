import { expect } from 'chai'
import { Browser, BrowserContext, chromium, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { baseUrl, headless, slowMo, XPath } from './utils'
import { addPageDiagnostics } from './utils/pageDiagnostics'

;[chromium].forEach((browserType) => {
  describe(`Browser: ${browserType.name()} without Metamask`, () => {
    let page: Page
    let browser: Browser
    let context: BrowserContext

    const resetBrowserContext = async () => {
      if (page) await page.close()
      if (context) await context.close()
      if (browser) await browser.close()

      browser = await browserType.launch({ headless, slowMo })
      context = await browser.newContext()
      page = await context.newPage()
      addPageDiagnostics(page)
    }

    before(resetBrowserContext)
    after(() => browser?.close())

    describe('Balance', () => {
      it('Reads the ETH2 staking contract', async () => {
        await page.goto(`${baseUrl}balance`)

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })
      })
    })
  })
})
