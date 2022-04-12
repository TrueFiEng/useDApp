import { expect } from 'chai';
import { BrowserContext, chromium, Page } from 'playwright';
import waitForExpect from 'wait-for-expect';
import { MetaMask } from './metamask/MetaMask';
import { headless, slowMo } from './utils';
import { addPageDiagnostics } from './utils/pageDiagnostics';

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

      await waitForExpect(() => {
        expect(context.pages().length).to.be.equal(2)
      })
      page = context.pages()[1] // Metamask opens a new page automatically after installation.
      metamask = new MetaMask(page)
      addPageDiagnostics(page)
    }

    before(resetBrowserContext)

    it('Opens and activates metamask popup', async () => {
      await metamask.activate()
    })

    // after(async () => {
    //   if (browser) await browser.close()
    // })
  })
})
