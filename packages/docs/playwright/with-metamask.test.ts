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
  waitForPopup,
} from '@usedapp/playwright'
import { baseUrl } from './constants'
import {
  connectToMetamask,
  firstSign,
  GNOSIS_SAFE_URL,
  initGnosisSafe,
  secondSign,
  connectToWalletConnect,
} from './gnosisSafeUtils'

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
        expect(await page.isVisible(`//*[text()='Current chain: ' and text()='3']`)).to.be.true
      })

      const popupPromise = waitForPopup(context)
      await page.click(XPath.text('button', 'Switch to Goerli'))
      const popupPage = await popupPromise
      await popupPage.click(XPath.text('button', 'Switch network'))

      await waitForExpect(async () => {
        expect(await page.isVisible(`//*[text()='Current chain: ' and text()='5']`)).to.be.true
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

describe(`Browser: ${browserType.name()} with Gnosis Safe`, () => {
  /**
   * There is a safe with 3 wallets on Goerli network created for testing purposes.
   * https://gnosis-safe.io/app/gor:0xA971C98755c3404Fc4458fcd98905980f68Af642/home
   * Address1: 0x26d1B17858bDDEC866b644fD7392Ab92835E6Bc0
   * Address2: 0x259B75A99d55550d0A2EdE6D601FE3aFE7a14DE7
   * Address3: 0x8A6dbE810e48fdDACe34b53F46bce05EeFd7d53D
   *
   * Sometimes tests can fail because balance one of the first two wallets is not enough to pay for gas,
   * so we need to use some kind of faucet to get enough balance for the test.
   *
   */

  const DOCS_GNOSIS_OWNER_FIRST = process.env.DOCS_GNOSIS_OWNER_FIRST
  const DOCS_GNOSIS_OWNER_SECOND = process.env.DOCS_GNOSIS_OWNER_SECOND

  let page: Page
  let gnosisSiwePage: Page
  let context: BrowserContext
  let metamask: MetaMask

  const resetBrowserContext = async () => {
    if (page) await page.close()
    if (context) await context.close()

    context = await browserType.launchPersistentContext('', {
      headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
      slowMo: 500,
      args,
    })

    log('Waiting until Metamask installs itself...')
    await waitForExpect(async () => {
      expect(context.backgroundPages().length).to.eq(1)
    })

    metamask = new MetaMask(await context.newPage())
    await metamask.activate()
    page = await context.newPage()
    gnosisSiwePage = await context.newPage()
    addPageDiagnostics(page)
  }

  before(() => resetBrowserContext())
  after(() => context?.close())

  before(async function () {
    if (!DOCS_GNOSIS_OWNER_FIRST || !DOCS_GNOSIS_OWNER_SECOND) this.skip()
    await metamask.addAccount(DOCS_GNOSIS_OWNER_FIRST)
    await metamask.addAccount(DOCS_GNOSIS_OWNER_SECOND)
  })

  it('Sign transaction from 2 wallets', async () => {
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))
    await page.click(XPath.text('a', 'Copy to clipboard'))

    log('Initializing Gnosis Safe page...')
    await initGnosisSafe({
      page: gnosisSiwePage,
      url: GNOSIS_SAFE_URL,
    })
    log('Gnosis Safe page initialized.')

    log('Connecting Metamask to Gnosis Safe...')
    await connectToMetamask({
      page: gnosisSiwePage,
      context,
    })
    log('Metamask connected to Gnosis Safe.')

    log('Connecting WalletConnect to Gnosis Safe...')
    await connectToWalletConnect({
      page: gnosisSiwePage,
    })
    log('WalletConnect connected to Gnosis Safe.')

    await page.click(XPath.text('button', 'Sign in'))
    expect(await page.isVisible(`//*[text()='Loading...']`)).to.be.true

    log('First wallet signs...')
    await firstSign({
      page: gnosisSiwePage,
      context,
    })
    log('First wallet signed.')

    await metamask.disconnectApp('gnosis-safe.io')
    await metamask.switchWallet(1)

    log('Second wallet signs...')
    await secondSign({
      page: gnosisSiwePage,
      context,
    })
    log('Second wallet signed.')

    await waitForExpect(async () => {
      expect(
        await page.isVisible(`//*[text()='Logged in with ' and text()='0xA971C98755c3404Fc4458fcd98905980f68Af642']`)
      ).to.be.true
    })

    await page.click(XPath.text('button', 'Sign out'))
  })

  it('Sign transaction from 2 wallets with page refresh', async () => {
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))

    await page.click(XPath.text('button', 'Sign in'))
    expect(await page.isVisible(`//*[text()='Loading...']`)).to.be.true

    await gnosisSiwePage.goto(GNOSIS_SAFE_URL)
    await gnosisSiwePage.click(XPath.text('p', 'WalletConnect'))

    log('First wallet signs...')
    await firstSign({
      page: gnosisSiwePage,
      context,
    })
    log('First wallet signed.')

    await metamask.disconnectApp('gnosis-safe.io')
    await metamask.switchWallet(2)

    await page.reload()
    await page.click(XPath.text('button', 'Connect with WalletConnect'))
    log('Page reloaded.')

    log('Second wallet signs...')
    await secondSign({
      page: gnosisSiwePage,
      context,
    })
    log('Second wallet signed.')

    await waitForExpect(async () => {
      expect(
        await page.isVisible(`//*[text()='Logged in with ' and text()='0xA971C98755c3404Fc4458fcd98905980f68Af642']`)
      ).to.be.true
    })

    await page.click(XPath.text('button', 'Sign out'))
  })

  it('Sign transaction from 2 wallets with closed page', async () => {
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))

    await page.click(XPath.text('button', 'Sign in'))
    expect(await page.isVisible(`//*[text()='Loading...']`)).to.be.true

    await gnosisSiwePage.goto(GNOSIS_SAFE_URL)
    await gnosisSiwePage.click(XPath.text('p', 'WalletConnect'))

    log('First wallet signs...')
    await firstSign({
      page: gnosisSiwePage,
      context,
    })
    log('First wallet signed.')

    await metamask.disconnectApp('gnosis-safe.io')
    await metamask.switchWallet(1)

    await page.close()
    log('Page closed.')

    log('Second wallet signs...')
    await secondSign({
      page: gnosisSiwePage,
      context,
    })
    log('Second wallet signed.')

    log('Waiting for the transaction to be mined...')
    await gnosisSiwePage.waitForSelector(XPath.text('div', 'Transaction successfully executed'), { timeout: 90000 })
    log('Transaction mined.')

    log('Opening page again...')
    page = await context.newPage()
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))

    await waitForExpect(async () => {
      expect(
        await page.isVisible(`//*[text()='Logged in with ' and text()='0xA971C98755c3404Fc4458fcd98905980f68Af642']`)
      ).to.be.true
    })
  })
})
