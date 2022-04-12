import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { MetaMask, metamaskChromeArgs as args } from './metamask'
import { baseUrl, slowMo, XPath } from './utils'
import { addPageDiagnostics } from './utils/pageDiagnostics'
import Xvfb from 'xvfb'

var xvfb = new Xvfb();

describe(`Browser: ${browserType.name()} with Metamask`, () => {
  let page: Page
  let context: BrowserContext
  let metamask: MetaMask

  before(() => xvfb.startSync())
  after(() => xvfb.startSync())

  const resetBrowserContext = async () => {
    if (page) await page.close()
    if (context) await context.close()

    context = await browserType.launchPersistentContext('', {
      headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
      slowMo,
      args
    })
    metamask = new MetaMask(await context.newPage())
    await metamask.activate()
    page = await context.newPage()
    addPageDiagnostics(page)
  }

  before(async () => {
    xvfb.startSync();
    await resetBrowserContext()
  })

  after(async () => {
    await context?.close()
    xvfb.stopSync()
  })

  before(async () => {
    // Connect Metamask to the app.
    await page.goto(`${baseUrl}balance`)

    const pages = context.pages().length
    await page.click(XPath.text('button', 'Connect'))
    await waitForExpect(() => {
      expect(context.pages().length).to.be.equal(pages + 1)
    })
    const popupPage = context.pages()[context.pages().length - 1]

    await popupPage.click(XPath.text('button', 'Next'))
    await popupPage.click(XPath.text('button', 'Connect'))
  })

  describe('Balance', () => {
    it('Reads the ETH2 staking contract and account balance', async () => {
      await page.goto(`${baseUrl}balance`)

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
