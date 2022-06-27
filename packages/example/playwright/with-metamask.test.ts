import debug from 'debug'
import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { slowMo, XPath, addPageDiagnostics, MetaMask, metamaskChromeArgs as args } from '@usedapp/playwright'
import { baseUrl } from './constants'

const log = debug('usedapp:example:playwright')

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

  before(async() => await resetBrowserContext())
  after(async() => await context?.close())

  before(async () => {
    log('Connecting Metamask to the app...')
    await page.goto(`${baseUrl}balance`)

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

  describe('Mulltichain', () => {

    it('Reads the chain names', async () => {
      await page.goto(`${baseUrl}multichain`)

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Mainnet'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Ropsten'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Kovan'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Arbitrum'))).to.be.true
      })
    })

    it('Check if all chains were loaded', async () => {
      await page.goto(`${baseUrl}multichain`)

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Chain id:', 4))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Current block timestamp:', 4))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Current difficulty:', 4))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Current block:', 4))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Ether balance:', 4))).to.be.true
      })
    })
  })

  describe('Connectors', () => {
    it('Can connect with a Metamask connector', async () => {
      await page.goto(`${baseUrl}connector`)

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
      })

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
      })

    })

    it('Holds MetaMask in session', async () => {
      await page.reload()

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
      })

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
      })
    })

    it('Can connect to connect wallet', async () => {
      await page.goto(`${baseUrl}connector`)

      await page.click(XPath.text('button', 'Disconnect'))
      await page.click(XPath.id('button', 'walletConnectButton'))
      await page.click(XPath.text('a', 'Desktop'))
      await page.click(XPath.text('div', 'Ambire'))

      const ambirePage = context.pages()[context.pages().length - 1]
      await ambirePage.click(XPath.text('button', 'Metamask'))

      const metamaskPage = context.pages()[context.pages().length - 1]

      await metamaskPage.click(XPath.text('button', 'Next'))
      await metamaskPage.click(XPath.text('button', 'Connect'))
      log('Metamask connected to the app.')

      await ambirePage.click(XPath.class('div', 'checkbox-mark'))
      await ambirePage.click(XPath.text('button', 'Done'))

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
      })

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
      })
    })

    it('Holds WalletConnect session', async () => {
      await page.reload()

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
        expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
      })

      await waitForExpect(async () => {
        expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
      })
    })
  })
})
