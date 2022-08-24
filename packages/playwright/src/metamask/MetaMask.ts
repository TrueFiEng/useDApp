import debug from 'debug'
import { Page } from 'playwright'
import { waitForPageToClose, waitForPopup } from '../utils'
import { XPath } from '../xpath'

export const log = debug('usedapp:playwright')

export class MetaMask {
  constructor(private page: Page) {}

  private extensionId: string | undefined = undefined

  async getExtensionId() {
    if (this.extensionId) return this.extensionId
    await this.page.goto('chrome://extensions')
    await this.page.click('#devMode')
    await this.page.waitForSelector('#extension-id')
    const locator = await this.page.locator('#extension-id')
    const id = await locator.innerText()
    if (!id?.startsWith('ID: ')) throw new Error('Getting Metamask extension ID failed.')
    const extractedId = id.slice(4)
    log(`Successfully extracted Metamask ID: ${extractedId}`)
    this.extensionId = extractedId
    return extractedId
  }

  async gotoMetamask() {
    const metamaskId = await this.getExtensionId()
    const metamaskUrl = 'chrome-extension://' + metamaskId + '//home.html'
    await this.page.goto(metamaskUrl)
  }

  async addAccount(privateKey: string, pages: Page[] = []) {
    log('Adding MetaMask account...')
    await this.gotoMetamask()
    await this.page.click('.account-menu__icon') // Top right menu with accounts.
    await this.page.click(XPath.text('div', 'Import Account'))
    await this.page.fill('#private-key-box', privateKey)
    await this.page.click(XPath.text('button', 'Import'))
    await this.page.waitForSelector('.account-menu__icon')
    log('MetaMask account added.')

    for (const page of pages) {
      const title = await page.title()
      log('Connecting metamask to page: ' + title)

      const connectPagePromise = waitForPopup(page.context())

      void page.evaluate(`
        window.ethereum
          .request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
      `)

      const connectPage = await connectPagePromise
      await connectPage.click(XPath.text('button', 'Next'))
      await connectPage.click(XPath.text('button', 'Connect'))

      await waitForPageToClose(connectPage)
    }
    log('Metamask account connected to pages.')
  }

  async switchToNetwork(network: 'Ethereum Mainnet' | 'Localhost 8545') {
    log('Switching network...')
    await this.gotoMetamask()
    await this.page.click('.network-display--clickable') // Network popup menu on the top right.

    // See if testnets are visible.
    if (!(await this.page.isVisible(XPath.text('span', network)))) {
      log('Making testnet visible in settings...')
      await this.page.click('.network-display--clickable') // Un-click it.
      await this.page.goto('chrome-extension://' + (await this.getExtensionId()) + '//home.html' + '#settings/advanced')

      // 4th checkbox relates to "Show test networks"
      // Could not find a better way to click this.
      await this.page.click('(//div[contains(@class, "toggle-button--off")])[4]//div')

      await this.page.click('.network-display--clickable') // Open it up again.
    }
    await this.page.click(XPath.text('span', network))
    log(`Network switched to "${network}"`)
  }


  async activate() {
    log('Activating Metamask...')
    await this.gotoMetamask()
    await this.page.click(XPath.text('button', 'Get Started'))
    await this.page.click(XPath.text('button', 'Create a Wallet'))
    await this.page.click(XPath.text('button', 'No Thanks')) // Telemetry.

    await this.page.fill('#create-password', 'qwerty123')
    await this.page.fill('#confirm-password', 'qwerty123')
    await this.page.check('xpath=//div[@role="checkbox"]')
    await this.page.click(XPath.text('button', 'Create'))
    await this.page.click(XPath.text('button', 'Next'))
    await this.page.click(XPath.text('button', 'Remind me later')) // Recovery phrase.

    await this.page.waitForSelector('xpath=//h2[contains(text(), "What\'s new")]', { state: 'visible' })

    await this.page.click('//button[@title="Close"]') // Close "What's new" section.
    log('Metamask activated.')
  }
}
