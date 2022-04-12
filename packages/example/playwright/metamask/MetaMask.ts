import { expect } from "chai"
import { Page } from "playwright"
import waitForExpect from "wait-for-expect"
export class MetaMask {
  constructor(private page: Page) {}

  async activate() {
    await this.page.click('xpath=//button[contains(text(), "Get Started")]')
    await this.page.click('xpath=//button[contains(text(), "Create a Wallet")]')
    await this.page.click('xpath=//button[contains(text(), "No Thanks")]') // Telemetry.
    await this.page.fill('#create-password', 'qwerty123')
    await this.page.fill('#confirm-password', 'qwerty123')
    await this.page.check('xpath=//div[@role="checkbox"]')
    await this.page.click('xpath=//button[contains(text(), "Create")]')
    await this.page.click('xpath=//button[contains(text(), "Next")]')
    await this.page.click('xpath=//button[contains(text(), "Remind me later")]') // Recovery phrase.
    await waitForExpect(async () => {
      expect(await this.page.isVisible('xpath=//h2[contains(text(), "What\'s new")]')) // Onboarding went through.
    })
    await this.page.click('//button[@title="Close"]') // Close "What's new" section.
  }
}
