import { BrowserContext, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { expect } from 'chai'
import { waitForPopup } from '@usedapp/playwright'
import debug from 'debug'

export const GNOSIS_SAFE_URL = 'https://gnosis-safe.io/app/gor:0xA971C98755c3404Fc4458fcd98905980f68Af642/home'

const log = debug('usedapp:docs:playwright')

export async function initGnosisSafe({ page, url }: { page: Page; url: string }) {
  await page.goto(url)
  await page.click('//span[contains(text(), "Accept all")]')
  await page.click('//p[contains(text(), "WalletConnect")]')
  await page.click('//span[contains(text(), "Continue")]')
  await page.click('//span[contains(text(), "Continue")]')
  await page.click('//span[contains(text(), "Continue")]')
  await page.click('//span[contains(text(), "Continue")]')
  await page.click('//span[contains(text(), "Continue")]')
  await page.click('//span[contains(text(), "Continue")]')
}

export async function connectToMetamask({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click('//p[contains(text(), "Connect Wallet")]')
  await page.click('//span[contains(text(), "Connect")]')
  await page.click('//span[contains(text(), "MetaMask")]')
  const popupPage = await popupPromise
  await popupPage.click('//button[contains(text(), "Next")]')
  const pages = context.pages().length
  await popupPage.click('//button[contains(text(), "Connect")]')
  try {
    await popupPage.click('//button[contains(text(), "Switch network")]')
    log('Switched network')
  } catch (err) {
    // Ignore error if network is already connected.
  }
  await waitForExpect(() => {
    expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
  })
}

export async function connectToWalletConnect({ page }: { page: Page }) {
  const isMac = await page.evaluate(() => navigator.platform.includes('Mac'))
  const modifier = isMac ? 'Meta' : 'Control'

  await page.frameLocator('[title="WalletConnect"]').locator('#wc-uri').focus()
  await page.keyboard.press(`${modifier}+KeyV`)
}

export async function firstSign({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click('//span[contains(text(), "Submit")]')
  const popupPage = await popupPromise
  await popupPage.click('//img[@alt="Scroll down"]')
  await popupPage.click('//button[contains(text(), "Sign")]')
}

export async function secondSign({ page, context }: { page: Page; context: BrowserContext }) {
  await page.goto(GNOSIS_SAFE_URL)
  await connectToMetamask({
    page: page,
    context,
  })
  await page.click('//span[contains(text(), "signMessage")]')
  await page.click('//span[contains(text(), "signMessage")]')
  await page.click('//span[contains(text(), "Confirm") and @class="MuiButton-label"]')
  const popupPromise = waitForPopup(context)
  await page.click('//span[contains(text(), "Submit")]')
  const popupPage = await popupPromise
  await popupPage.click('//button[contains(text(), "Confirm")]')
}
