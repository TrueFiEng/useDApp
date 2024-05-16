import debug from 'debug'
import { Page } from 'playwright'
import { waitForPageToClose, waitForPopup } from '../utils'
import { XPath } from '../xpath'

export const log = debug('usedapp:playwright')

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class MetaMask {
  constructor(private page: Page) {}

  private extensionId: string | undefined = undefined
  private noLocalhostYet = true

  async getExtensionId() {
    if (this.extensionId) return this.extensionId
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

  async addAccount(privateKey: string, pages: Page[] = []) {
    log('Adding MetaMask account...')
    await this.gotoMetamask()

    await sleep(1000)
    if (await this.page.getByTestId('popover-close').isVisible()) {
      await this.page.getByTestId('popover-close').click()
    }

    await this.page.getByTestId('account-menu-icon').click() // Top right menu with accounts.
    await this.page.getByRole('button', { name: 'Add account or hardware wallet' }).click()
    await this.page.getByRole('button', { name: 'Import account' }).click()
    await this.page.fill('#private-key-box', privateKey)
    await this.page.getByTestId('import-account-confirm-button').click()
    log('MetaMask account added.')

    if (!pages.length) return

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

  async switchToNetwork(network: 'Ethereum Mainnet' | 'Localhost 8545' | 'Sepolia') {
    if (network === 'Localhost 8545' && this.noLocalhostYet) {
      this.noLocalhostYet = false
      await this.page.goto(
        'chrome-extension://' + (await this.getExtensionId()) + '//home.html#settings/networks/add-network'
      )
      await this.page.getByLabel('Network name').fill('Localhost 8545')
      await this.page.getByLabel('New RPC URL').fill('http://localhost:8545')
      await this.page.getByLabel('Chain ID').fill('1337')
      await this.page.getByTestId('network-form-ticker-input').fill('ETH')
      await this.page.getByRole('button', { name: 'Save' }).click()
    }

    log('Switching network...')
    await this.gotoMetamask()

    await sleep(1000)
    const popoverClose = this.page.getByTestId('popover-close')
    if (await popoverClose.isVisible()) {
      await popoverClose.click()
    }

    await this.page.getByTestId('network-display').click() // Network popup menu on the top right.

    await sleep(1000)
    if (await this.page.isVisible('.toggle-button--off')) {
      await this.page.check('.toggle-button--off')
    }

    await this.page.getByTestId(network).click()
    log(`Network switched to "${network}"`)
  }

  async activate() {
    log('Activating Metamask...')
    await this.gotoMetamask()
    await this.page.getByRole('checkbox').click()
    await this.page.getByRole('button', { name: 'Create a new wallet' }).click()
    await this.page.getByRole('button', { name: 'No thanks' }).click() // Telemetry.

    await this.page.getByTestId('create-password-new').fill('qwerty123')
    await this.page.getByTestId('create-password-confirm').fill('qwerty123')
    await this.page.getByRole('checkbox').click()

    await this.page.getByRole('button', { name: 'Create a new wallet' }).click()
    await this.page.getByRole('button', { name: 'Remind me later (not recommended)' }).click()
    await this.page.getByRole('checkbox').click()
    await this.page.getByRole('button', { name: 'Skip' }).click()
    await this.page.getByRole('button', { name: 'Got it' }).click()
    await this.page.getByRole('button', { name: 'Next' }).click()
    await this.page.getByRole('button', { name: 'Done' }).click()
    await this.page.getByRole('button', { name: 'No thanks' }).click()

    log('Metamask activated.')
  }

  async switchWallet(index: number) {
    log('Switching wallet...')
    await this.gotoMetamask()
    await this.page.click('.account-menu__icon')
    await this.page.click(`//div[contains(text(), "Account ${index + 1}")]`)

    log('Wallet switched.')
  }

  async disconnectApp(app: string) {
    log(`Disconnecting ${app}...`)
    await this.gotoMetamask()
    await this.page.click(`//button[@title='Account Options']`)
    await this.page.click(XPath.text('span', 'Connected sites'))
    const disconnectButton = this.page.locator(`//span[contains(text(), "${app}")]/ancestor::div[1]/ancestor::div[1]/a`)
    await disconnectButton.click()
    await this.page.click(XPath.text('button', 'Disconnect'))
    log(`${app} disconnected.`)
  }
}
