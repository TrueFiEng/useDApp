import debug from 'debug'
import { Page } from 'playwright'
import { XPath } from '../xpath'

export const log = debug('usedapp:playwright')

export class MetaMask {
  private extensionId: string | undefined
  constructor(private page: Page) {}

  async getExtensionId() {
    await this.page.goto('chrome://extensions')
    await this.page.click('#devMode')
    await this.page.waitForSelector('#extension-id')
    const locator = this.page.locator('#extension-id')
    const id = await locator.innerText()
    if (!id?.startsWith('ID: ')) throw new Error('Getting Metamask extension ID failed.')
    const extractedId = id.slice(4)
    log(`Successfully extracted Metamask ID: ${extractedId}`)
    this.extensionId = extractedId
    return extractedId
  }

  async gotoMetamask() {
    const metamaskId = this.extensionId ?? (await this.getExtensionId())
    const metamaskUrl = 'chrome-extension://' + metamaskId + '//home.html'
    await this.page.goto(metamaskUrl)
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

  async addWallet(privateKey: string) {
    log('Adding wallet...')
    await this.gotoMetamask()
    await this.page.click(XPath.class('div', 'identicon__address-wrapper'))
    await this.page.click(XPath.text('div', 'Import Account'))
    await this.page.fill('#private-key-box', privateKey)
    await this.page.click(XPath.text('button', 'Import'))
    log('Wallet added.')
  }

  async switchWallet(index: number) {
    log('Switching wallet...')
    await this.gotoMetamask()
    await this.page.click(XPath.class('div', 'identicon__address-wrapper'))
    await this.page.click(XPath.text('div', `Account ${index + 1}`))
    log('Wallet switched.')
  }

  async disconnectApp(app: string) {
    log(`Disconnecting ${app}...`)
    await this.gotoMetamask()
    await this.page.click(`xpath=//button[@title='Account Options']`)
    await this.page.click(XPath.text('span', 'Connected sites'))
    const disconnectButton = this.page.locator(
      `xpath=//span[contains(text(), "${app}")]/ancestor::div[1]/ancestor::div[1]/a`
    )
    await disconnectButton.click()
    await this.page.click(XPath.text('button', 'Disconnect'))
    log(`${app} disconnected.`)
  }
}
