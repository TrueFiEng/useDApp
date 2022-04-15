import { Page } from 'playwright'
import { log } from '../log'
import { XPath } from '../xpath'

export class MetaMask {
  constructor(private page: Page) {}

  async getExtensionId() {
    await this.page.goto('chrome://extensions')
    await this.page.click('#devMode')
    await this.page.waitForSelector('#extension-id')
    const locator = await this.page.locator('#extension-id')
    const id = await locator.innerText()
    if (!id?.startsWith('ID: ')) throw new Error('Getting Metamask extension ID failed.')
    const extractedId = id.slice(4)
    log(`Successfully extracted Metamask ID: ${extractedId}`)
    return extractedId
  }

  async gotoMetamask() {
    const metamaskId = await this.getExtensionId()
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

    await this.page.waitForSelector('xpath=//h2[contains(text(), "What\'s new")]', {state: 'visible'})

    await this.page.click('//button[@title="Close"]') // Close "What's new" section.
    log('Metamask activated.')
  }
}
