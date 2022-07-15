import { expect } from 'chai'
import { Browser, BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { headless, slowMo, XPath, addPageDiagnostics } from '@usedapp/playwright'

export const withoutMetamaskTest = (baseUrl: string) => {
  describe(`Browser: ${browserType.name()} without Metamask`, () => {
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
  
    before(async () => await resetBrowserContext())
    after(async () => await browser?.close())
  
    describe('Balance', () => {
      it('Reads the ETH2 staking contract', async () => {
        await page.goto(`${baseUrl}balance`)
  
        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })
      })
    })
  
    describe('Prices', () => {
      it('Reads the ETH and WETH prices', async () => {
        await page.goto(`${baseUrl}prices`)
  
        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Ethereum price:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'WETH price:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', '$'))).to.be.true
        })
      })
    })
  
    describe('Block info', () => {
      it('Reads the block info', async () => {
        await page.goto(`${baseUrl}block`)
  
        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Chain id:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Current block:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Current difficulty:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Current block timestamp:'))).to.be.true
        })
      })
    })
  
    describe('Tokens', () => {
      it('Reads the tokens info', async () => {
        await page.goto(`${baseUrl}tokens`)
  
        // const tokenResponse = await page.evaluate(async () => {
        //   const UNISWAP_TOKEN_LIST_URL = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
        //   return await fetch(UNISWAP_TOKEN_LIST_URL)
        //     .then(r => r.ok ? r.json() : Promise.reject(r))
        // })
  
        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('p', 'Uniswap Labs List'))).to.be.true
  
          // tokenResponse.tokens.map(async (token: any) => {
          //   return expect(await page.isVisible(XPath.text('p', token.name))).to.be.true
          // })
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
        })
      })
    })
  })
}
