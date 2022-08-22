import { BrowserContext, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { expect } from 'chai'
import { XPath, waitForPopup } from '@usedapp/playwright'

export async function initGnosisSafe({ page, url }: { page: Page; url: string }) {
  await page.goto(url)
  await page.click(XPath.text('span', 'Accept all'))
  await page.click(XPath.text('p', 'WalletConnect'))
  await page.click(XPath.text('span', 'Continue'))
  await page.click(XPath.text('span', 'Continue'))
  await page.click(XPath.text('span', 'Continue'))
  await page.click(XPath.text('span', 'Continue'))
  await page.click(XPath.text('span', 'Continue'))
}

export async function connectToMetamask({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click(XPath.text('p', 'Connect Wallet'))
  await page.click(XPath.text('span', 'Connect'))
  await page.click(XPath.text('span', 'MetaMask'))
  const popupPage = await popupPromise
  await popupPage.click(XPath.text('button', 'Next'))
  const pages = context.pages().length
  await popupPage.click(XPath.text('button', 'Connect'))
  try {
    await popupPage.click(XPath.text('button', 'Switch network'))
  } catch (err) {
    // Ignore error
  }
  await waitForExpect(() => {
    expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
  })
}

export async function walletConnectConnect({ page }: { page: Page }) {
  const iframeElement = await page.waitForSelector('//iframe')
  const iframe = await iframeElement.contentFrame()

  const isMac = await page.evaluate(() => navigator.platform.includes('Mac'))
  const modifier = isMac ? 'Meta' : 'Control'

  await iframe?.focus('#wc-uri')
  await page.keyboard.press(`${modifier}+KeyV`)
}

export async function firstSign({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click(XPath.text('span', 'Submit'))
  const popupPage = await popupPromise
  await popupPage.click('//img[@alt="Scroll down"]')
  await popupPage.click(XPath.text('button', 'Sign'))
}

export async function secondSign({ page, context }: { page: Page; context: BrowserContext }) {
  await page.goto('https://gnosis-safe.io/app/rin:0x390De1aB69a6ef1e48545aa7c9852E5Cdff9a08C/home')
  await page.reload()

  await connectToMetamask({
    page: page,
    context,
  })

  await page.click(XPath.text('span', 'signMessage'))
  await page.click(XPath.text('span', 'signMessage'))
  await page.click('xpath=//span[contains(text(), "Confirm") and @class="MuiButton-label"]')
  const popupPromise = waitForPopup(context)
  await page.click(XPath.text('span', 'Submit'))
  const popupPage = await popupPromise
  await popupPage.click(XPath.text('button', 'Confirm'))
}
