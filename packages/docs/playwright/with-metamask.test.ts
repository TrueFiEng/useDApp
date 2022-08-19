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

//       popupPromise = waitForPopup(context)
//       await page.click(XPath.text('button', 'Switch to Mainnet'))
//       popupPage = await popupPromise
//       await popupPage.click(XPath.text('button', 'Switch network'))

//       await waitForExpect(async () => {
//         expect(await page.isVisible(`//*[text()='Current chain: ' and text()='1']`)).to.be.true
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

describe(`Browser: ${browserType.name()} with Gnosis Safe`, () => {
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
    await metamask.addWallet('44e06012d980837ea48fe4e712837ddfcf7e6f8aeb37975b9ee9bbf39029a65c')
    await metamask.switchWallet(1)
    log('Metamask connected to the app.')
  })

  it('test', async () => {
    await page.goto(`${baseUrl}Guides/Sign%20in%20with%20Ethereum`)
    await page.click(XPath.text('button', 'Connect with WalletConnect'))
    await page.click(XPath.text('a', 'Copy to clipboard'))

    const gnosisSiwePage = await context.newPage()
    await gnosisSiwePage.goto('https://gnosis-safe.io/app/rin:0xaB1D9712C0c45F41115F771831804A2bc726403C/home')
    await gnosisSiwePage.click(XPath.text('span', 'Accept all'))
    const popupPromise = waitForPopup(context)
    await gnosisSiwePage.click(XPath.text('p', 'Connect Wallet'))
    await gnosisSiwePage.click(XPath.text('span', 'Connect'))
    await gnosisSiwePage.click(XPath.text('span', 'MetaMask'))
    const popupPage = await popupPromise

    await popupPage.click(XPath.text('button', 'Next'))
    const pages = context.pages().length
    await popupPage.click(XPath.text('button', 'Connect'))
    await popupPage.click(XPath.text('button', 'Switch network'))
    await waitForExpect(() => {
      expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
    })

    await gnosisSiwePage.click(XPath.text('p', 'WalletConnect'))
    await gnosisSiwePage.click(XPath.text('span', 'Continue'))
    await gnosisSiwePage.click(XPath.text('span', 'Continue'))
    await gnosisSiwePage.click(XPath.text('span', 'Continue'))
    await gnosisSiwePage.click(XPath.text('span', 'Continue'))
    await gnosisSiwePage.click(XPath.text('span', 'Continue'))
    await gnosisSiwePage.fill('#wc-uri', '123456')

    console.log('done')
  })
})
