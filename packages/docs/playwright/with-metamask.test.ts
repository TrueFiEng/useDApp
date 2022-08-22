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
import { connectToMetamask, firstSign, initGnosisSafe, secondSign, walletConnectConnect } from './gnosisSafeUtils'

waitForExpect.defaults.timeout = 90000

const log = debug('usedapp:docs:playwright')

// describe(`Browser: ${browserType.name()} with Metamask`, () => {
//   let page: Page
//   let context: BrowserContext
//   let metamask: MetaMask

//   const resetBrowserContext = async () => {
//     if (page) await page.close()
//     if (context) await context.close()

//     context = await browserType.launchPersistentContext('', {
//       headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
//       slowMo,
//       args,
//     })

//     log('Waiting until Metamask installs itself...')
//     await waitForExpect(async () => {
//       expect(context.backgroundPages().length).to.eq(1)
//     })

//     metamask = new MetaMask(await context.newPage())
//     await metamask.activate()
//     page = await context.newPage()
//     addPageDiagnostics(page)
//   }

//   before(() => resetBrowserContext())
//   after(() => context?.close())

//   before(async () => {
//     log('Connecting Metamask to the app...')
//     await metamask.addWallet('44e06012d980837ea48fe4e712837ddfcf7e6f8aeb37975b9ee9bbf39029a65c')
//     await metamask.switchWallet(1)
//     await page.goto(`${baseUrl}Guides/Transactions/Switching%20Networks`)

//     const popupPromise = waitForPopup(context)
//     await page.click(XPath.text('button', 'Connect'))
//     const popupPage = await popupPromise

//     await popupPage.click(XPath.text('button', 'Next'))
//     const pages = context.pages().length
//     await popupPage.click(XPath.text('button', 'Connect'))
//     await waitForExpect(() => {
//       expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
//     })
//     log('Metamask connected to the app.')
//   })

//   describe('Guides/Transactions', () => {
//     it('Switches networks', async () => {
//       await page.goto(`${baseUrl}Guides/Transactions/Switching%20Networks`)

//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Current chain: ' and text()='1']`)).to.be.true
//       })

//       let popupPromise = waitForPopup(context)
//       await page.click(XPath.text('button', 'Switch to Rinkeby'))
//       let popupPage = await popupPromise
//       await popupPage.click(XPath.text('button', 'Switch network'))

//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Current chain: ' and text()='4']`)).to.be.true
//       })
//     })
//   })

//   describe('Guides/Siwe', () => {
//     it('Can sign in and sign out', async () => {
//       await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Not logged in']`)).to.be.true
//       })
//       const popupPromise = waitForPopup(context)
//       await page.click(XPath.text('button', 'Sign in'))
//       const popupPage = await popupPromise
//       await popupPage.click(XPath.text('button', 'Sign'))
//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Logged in with ']`)).to.be.true
//       })
//       await page.click(XPath.text('button', 'Sign out'))
//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Not logged in']`)).to.be.true
//       })
//     })
//   })
// })

const GNOSIS_SAFE_URL = 'https://gnosis-safe.io/app/rin:0x390De1aB69a6ef1e48545aa7c9852E5Cdff9a08C/home'

describe(`Browser: ${browserType.name()} with Gnosis Safe`, () => {
  let page: Page
  let gnosisSiwePage: Page
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
    gnosisSiwePage = await context.newPage()
    addPageDiagnostics(page)
  }

  before(() => resetBrowserContext())
  after(() => context?.close())

  before(async () => {
    log('Connecting Metamask to the app...')
    await metamask.addWallet('7407614617afd9d5976df5a10b13c7d000101fb4b14e746e13ad10e39302867e')
    await metamask.addWallet('e86c73da6ef1d83b3951c5bfe7d01c17d4cee8d5319266865158d28a83cd326a')
    log('Metamask connected to the app.')
  })

  it('Sign transaction from 2 wallets', async () => {
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))
    await page.click(XPath.text('a', 'Copy to clipboard'))

    await initGnosisSafe({
      page: gnosisSiwePage,
      url: GNOSIS_SAFE_URL,
    })

    // Connect to metamask
    await connectToMetamask({
      page: gnosisSiwePage,
      context,
    })

    await walletConnectConnect({
      page: gnosisSiwePage,
    })

    await page.click(XPath.text('button', 'Sign in'))
    expect(await page.isVisible(`//*[text()='Loading...']`)).to.be.true

    await firstSign({
      page: gnosisSiwePage,
      context,
    })

    await metamask.disconnectApp('gnosis-safe.io')
    await metamask.switchWallet(1)

    await secondSign({
      page: gnosisSiwePage,
      context,
    })
    // await gnosisSiwePage.waitForSelector(XPath.text('div', 'Transaction successfully executed'), { timeout: 120000 })

    await waitForExpect(async () => {
      expect(await page.isVisible(`//*[text()='Logged in with ']`)).to.be.true
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

    await firstSign({
      page: gnosisSiwePage,
      context,
    })

    await page.reload()
    await page.click(XPath.text('button', 'Connect with WalletConnect'))

    await metamask.disconnectApp('gnosis-safe.io')
    await metamask.switchWallet(2)
    expect(await page.isVisible(`//*[text()='Loading...']`)).to.be.true

    await secondSign({
      page: gnosisSiwePage,
      context,
    })
    // await gnosisSiwePage.waitForSelector(XPath.text('div', 'Transaction successfully executed'), { timeout: 120000 })

    await waitForExpect(async () => {
      expect(await page.isVisible(`//*[text()='Logged in with ']`)).to.be.true
    })
  })
})
