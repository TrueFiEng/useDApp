import debug from 'debug'
import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { slowMo, XPath, addPageDiagnostics, MetaMask, metamaskChromeArgs as args } from '@usedapp/playwright'

const log = debug('usedapp:example:playwright')

export const withMetamaskTest = (url: string) => {
  describe(`Browser: ${browserType.name()} with Metamask`, () => {
    let page: Page
    let context: BrowserContext
    let metamask: MetaMask

    const resetBrowserContext = async () => {
      if (page) await page.close()
      if (context) await context.close()

      context = await browserType.launchPersistentContext('', {
        headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
        slowMo,
        args,
      })

      log('Waiting until Metamask installs itself...')
      await waitForExpect(async () => {
        expect(context.backgroundPages().length).to.eq(1)
      })

      metamask = new MetaMask(await context.newPage())
      await metamask.activate()
      page = await context.newPage()
      addPageDiagnostics(page)
    }

    before(() => resetBrowserContext())
    after(() => context?.close())

    before(async () => {
      log('Connecting Metamask to the app...')
      await page.goto(`${url}balance`)

      const pages = context.pages().length
      await page.click(XPath.text('button', 'Connect'))
      await waitForExpect(() => {
        expect(context.pages().length).to.be.equal(pages + 1)
      })
      const popupPage = context.pages()[context.pages().length - 1]

      await popupPage.click(XPath.text('button', 'Next'))
      await popupPage.click(XPath.text('button', 'Connect'))
      log('Metamask connected to the app.')
    })

    describe('Balance', () => {
      it('Reads the ETH2 staking contract and account balance', async () => {
        await page.goto(`${url}balance`)

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Ether balance:'))).to.be.true
        })
      })
    })
  })
}
