import { BrowserContext, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { expect } from 'chai'
import { waitForPopup, XPath } from '@usedapp/playwright'
import debug from 'debug'
import { sleep } from './sleep'

export const GNOSIS_SAFE_URL = 'https://app.safe.global/gor:0xA971C98755c3404Fc4458fcd98905980f68Af642/home'

const log = debug('usedapp:docs:playwright')

export async function initGnosisSafe({ page, url }: { page: Page; url: string }) {
  await page.goto(url)
  await page.click(XPath.text('button', 'Accept all'))
  try {
    // Try to close the popup with info about the new Safe app version
    await page.click('//*[local-name()="svg" and @data-testid="CloseIcon"]', { timeout: 2000 })
  } catch (e) {
    // the button is not there - ignore
  }

  await page.click(XPath.text('*', 'WalletConnect'))

  // click continue button while it's there
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await page.click(XPath.text('button', 'Continue'), { timeout: 2000 })
    }
  } catch (e) {
    // the button is not there - ignore
  }
}

export async function connectToMetamask({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click(XPath.text('p', 'Connect wallet'), { timeout: 2000 })
  await page.click(XPath.text('button', 'Connect'))
  await page.click('button:has-text("MetaMask")')

  const popupPage = await popupPromise
  await popupPage.click(XPath.text('button', 'Next'))
  const pages = context.pages().length
  await popupPage.click(XPath.text('button', 'Connect'))

  await waitForExpect(() => {
    expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
  })

  try {
    const popupPromise2 = waitForPopup(context)
    await page.click(XPath.text('button', 'Switch'), { timeout: 2000 })
    const popupPage2 = await popupPromise2
    await popupPage2.click(XPath.text('button', 'Switch'))

    await waitForExpect(() => {
      expect(context.pages().length).to.be.eq(pages - 1) // Wait for the popup to be closed automatically.
    })
  } catch (e) {
    // There is no need to switch the network - ignore
  }
}

export async function connectToWalletConnect({ page }: { page: Page }) {
  const isMac = await page.evaluate(() => navigator.platform.includes('Mac'))
  const modifier = isMac ? 'Meta' : 'Control'

  await page.frameLocator('[title="WalletConnect"]').locator('#wc-uri').focus()
  await page.keyboard.press(`${modifier}+KeyV`)
}

export async function firstSign({ page, context }: { page: Page; context: BrowserContext }) {
  const popupPromise = waitForPopup(context)
  await page.click('button:has-text("Submit")', { timeout: 5000 })
  const popupPage = await popupPromise
  await popupPage.click('//img[@alt="Scroll down"]')
  await popupPage.click(XPath.text('button', 'Sign'))
}

export async function secondSign({ page, context }: { page: Page; context: BrowserContext }) {
  const connectPopupPromise = waitForPopup(context)
  await page.goto(GNOSIS_SAFE_URL)
  const connectPopupPage = await connectPopupPromise
  await connectPopupPage.click(XPath.text('button', 'Next'))
  await connectPopupPage.click(XPath.text('button', 'Connect'))

  await page.click('//*[contains(text(), "View") and contains(text(), "transaction")]')
  await page.click(XPath.text('button', 'Confirm'))
  const popupPromise = waitForPopup(context)
  try {
    await page.click('button:has-text("Submit")', { timeout: 5000 })
  } catch (e) {
    log('Submitting transaction failed, trying again')
    // Transaction cannot be executed, trying to do it again
    await page.reload()
    await page.click(XPath.text('button', 'Confirm'))
    await page.click('button:has-text("Submit")', { timeout: 5000 })
  }
  const popupPage = await popupPromise
  await popupPage.click(XPath.text('button', 'Confirm'))
}

export async function waitForTransaction({ page }: { page: Page }) {
  log('Processing transaction')
  await sleep(2000)
  await waitForExpect(async () => {
    expect(await page.isVisible(XPath.text('*', 'Processing'))).to.be.false
  })
  log('Transaction processed')
  await sleep(2000)
  log('Indexing transaction')
  await waitForExpect(async () => {
    expect(await page.isVisible(XPath.text('*', 'Indexing'))).to.be.false
  })
  log('Transaction indexed')
}
