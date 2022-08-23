import debug from 'debug'
import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import {
  slowMo,
  XPath,
  addPageDiagnostics,
  MetaMask,
  metamaskChromeArgs as args,
  waitForPopup
} from '@usedapp/playwright'
import {baseUrl} from './constants'

const log = debug('usedapp:docs:playwright')

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
    await page.goto(`${baseUrl}Guides/Transactions/Switching%20Networks`)

    const popupPromise = waitForPopup(context)
    await page.click(XPath.text('button', 'Connect'))
    const popupPage = await popupPromise

    await popupPage.click(XPath.text('button', 'Next'))
    const pages = context.pages().length
    await popupPage.click(XPath.text('button', 'Connect'))
    await waitForExpect(() => {
      expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
    })
    log('Metamask connected to the app.')
  })

  describe('Guides/Transactions', () => {
    it('Switches networks', async () => {
      await page.goto(`${baseUrl}Guides/Transactions/Switching%20Networks`)

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Current chain: ' and text()='1']`)).to.be.true
      })

      let popupPromise = waitForPopup(context)
      await page.click(XPath.text('button', 'Switch to Goerli'))
      let popupPage = await popupPromise
      await popupPage.click(XPath.text('button', 'Switch network'))

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Current chain: ' and text()='5']`)).to.be.true
      })

      popupPromise = waitForPopup(context)
      await page.click(XPath.text('button', 'Switch to Mainnet'))
      popupPage = await popupPromise
      await popupPage.click(XPath.text('button', 'Switch network'))

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Current chain: ' and text()='1']`)).to.be.true
      })
    })
  })

  describe('Guides/Siwe', () => {
    it('Can sign in and sign out', async () => {
      await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Not logged in']`)).to.be.true
      })

      const popupPromise = waitForPopup(context)
      await page.click(XPath.text('button', 'Sign in'))
      const popupPage = await popupPromise
      await popupPage.click(XPath.text('button', 'Sign'))

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Logged in with ']`)).to.be.true
      })

      await page.click(XPath.text('button', 'Sign out'))

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Not logged in']`)).to.be.true
      })
    })
  })
})
