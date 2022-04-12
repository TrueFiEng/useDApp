import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { MetaMask, metamaskChromeArgs } from './metamask'
import { baseUrl, sleep, slowMo, waitUntil, XPath } from './utils'
import { addPageDiagnostics } from './utils/pageDiagnostics'
import Xvfb from 'xvfb'

let xvfb = undefined as any
// var xvfb = process.env.CI ? new Xvfb({
//   silent: true,
//   xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
// }) : undefined;

if (xvfb) console.log('USING XVFB!')

describe(`Browser: ${browserType.name()} with Metamask`, () => {
  let page: Page
  let context: BrowserContext
  let metamask: MetaMask

  before(() => xvfb?.startSync())
  after(() => xvfb?.stopSync())

  const resetBrowserContext = async () => {
    if (page) await page.close()
    if (context) await context.close()

    context = await browserType.launchPersistentContext('', {
      headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
      slowMo,
      args: [
        ...metamaskChromeArgs,
        '--no-sandbox',
        '--disable-setuid-sandbox'
        // '--display='+xvfb._display
      ]
    })

    console.log('Waiting for background pages...')
    await waitForExpect(async () => {
      expect(context.backgroundPages().length).to.eq(1)
    })

    await sleep(10000) // wait until metamask installs itself
    metamask = new MetaMask(await context.newPage())
    await metamask.activate()
    page = await context.newPage()
    addPageDiagnostics(page)
  }

  before(async () => {
    xvfb?.startSync();
    await resetBrowserContext()
  })

  after(async () => {
    await context?.close()
    xvfb?.stopSync()
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
