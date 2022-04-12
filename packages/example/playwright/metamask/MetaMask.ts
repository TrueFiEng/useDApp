import { expect } from 'chai'
import { Page } from 'playwright'
import { XPath } from '../utils'
import waitForExpect from 'wait-for-expect'
import { metamaskUrl } from './constants'
export class MetaMask {
  constructor(private page: Page) {}

  async activate() {
    await this.page.goto(metamaskUrl)
    await this.page.click(XPath.text('button', 'Get Started'))
    await this.page.click(XPath.text('button', 'Create a Wallet'))
    await this.page.click(XPath.text('button', 'No Thanks')) // Telemetry.

    await this.page.fill('#create-password', 'qwerty123')
    await this.page.fill('#confirm-password', 'qwerty123')
    await this.page.check('xpath=//div[@role="checkbox"]')
    await this.page.click(XPath.text('button', 'Create'))
    await this.page.click(XPath.text('button', 'Next'))
    await this.page.click(XPath.text('button', 'Remind me later')) // Recovery phrase.

    await waitForExpect(async () => {
      expect(await this.page.isVisible('xpath=//h2[contains(text(), "What\'s new")]')) // Onboarding went through.
    })
    await this.page.click('//button[@title="Close"]') // Close "What's new" section.
  }
}
