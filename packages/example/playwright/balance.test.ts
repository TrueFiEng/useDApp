import { expect } from 'chai';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import waitForExpect from 'wait-for-expect';
import { baseUrl, headless, slowMo } from './utils';
import { addPageDiagnostics } from './utils/pageDiagnostics';

[chromium].forEach((browserType) => {
  describe(`Balance tab in ${browserType.name()}`, () => {
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
