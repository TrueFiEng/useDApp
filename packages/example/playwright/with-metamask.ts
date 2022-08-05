import debug from 'debug'
import { expect } from 'chai'
import { BrowserContext, chromium as browserType, Page } from 'playwright'
import waitForExpect from 'wait-for-expect'
import { slowMo, XPath, addPageDiagnostics, MetaMask, metamaskChromeArgs as args, waitForPopup, waitForPageToClose } from '@usedapp/playwright'
import { BigNumber, utils, Wallet } from 'ethers'
import Ganache, { Server } from 'ganache'
import { defaultAccounts } from 'ethereum-waffle'

const log = debug('usedapp:example:playwright')

export const withMetamaskTest = (baseUrl: string) => {
  describe(`Browser: ${browserType.name()} with Metamask`, () => {
    let page: Page
    let context: BrowserContext
    let metamask: MetaMask
    let server: Server<'ethereum'>

    const resetBrowserContext = async () => {
      if (page) await page.close()
      if (context) await context.close()

      context = await browserType.launchPersistentContext('', {
        headless: false, // Extensions only work in Chrome / Chromium in non-headless mode.
        slowMo,
        args,
      })

      log('Waiting until Metamask installs itself...')
      await waitForExpect(async () => {
        expect(context.backgroundPages().length).to.eq(1)
      })

      metamask = new MetaMask(await context.newPage())
      await metamask.activate()
      page = await context.newPage()
      addPageDiagnostics(page)
    }

    const startGanache = async () => {
      server = Ganache.server({
        accounts: defaultAccounts,
        logging: {
          quiet: true,
        }
      })
      await server.listen(8545)
    }

    const stopGanache = () => server.close()

    before(async () => await resetBrowserContext())
    after(async () => await context?.close())

    before(startGanache)
    after(stopGanache)

    before(async () => {
      log('Connecting Metamask to the app...')
      await page.goto(`${baseUrl}balance`)

      const pages = context.pages().length
      await page.click(XPath.text('button', 'Connect'))
      await waitForExpect(() => {
        expect(context.pages().length).to.be.equal(pages + 1)
      })
      const popupPage = context.pages()[context.pages().length - 1]

      await popupPage.click(XPath.text('button', 'Next'))
      await popupPage.click(XPath.text('button', 'Connect'))
      log('Metamask connected to the app.')

      await metamask.addAccount(defaultAccounts[0].secretKey, [page])

      await metamask.switchToNetwork('Localhost 8545')

      const txConfirmPagePromise = waitForPopup(context)
      const txConfirmPage = await txConfirmPagePromise
      await txConfirmPage.click(XPath.text('button', 'Confirm'))
      await waitForPageToClose(txConfirmPage)
      await page.waitForSelector(XPath.text('h1', 'Balance'))

      await metamask.switchToNetwork('Ethereum Mainnet')
    })

    describe('Balance', () => {
      it('Reads the ETH2 staking contract and account balance', async () => {
        await page.goto(`${baseUrl}balance`)

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Ether balance:'))).to.be.true
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
          expect(await page.isVisible(XPath.text('span', 'Ether balance:', 4))).to.be.true
        })
      })
    })

    describe('Connectors', () => {
      it('Can connect with a Metamask connector', async () => {
        await page.goto(`${baseUrl}connector`)

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
        })
      })

      it('Holds MetaMask in session', async () => {
        await page.reload()

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
        })
      })

      it('Can connect to connect wallet', async () => {
        await page.goto(`${baseUrl}connector`)

        let pagesNumber = context.pages().length
        await page.click(XPath.text('button', 'Disconnect'))
        await page.click(XPath.id('button', 'WalletConnectButton'))
        await page.click(XPath.text('a', 'Desktop'))
        await page.click(XPath.text('div', 'Ambire'))

        // waiting for the ambire page to open
        await waitForExpect(() => {
          expect(context.pages().length).to.be.equal(pagesNumber + 1)
        })

        const ambirePage = context.pages()[context.pages().length - 1]
        pagesNumber = context.pages().length
        await ambirePage.click(XPath.text('button', 'Metamask'))

        // waiting for the metamask page to open
        await waitForExpect(() => {
          expect(context.pages().length).to.be.equal(pagesNumber + 1)
        })

        const metamaskPage = context.pages()[context.pages().length - 1]

        await metamaskPage.click(XPath.text('button', 'Next'))
        await metamaskPage.click(XPath.text('button', 'Connect'))
        log('Metamask connected to the app.')

        await ambirePage.click(XPath.class('div', 'checkbox-mark'))
        await ambirePage.click(XPath.text('button', 'Done'))

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
        })
      })

      it('Holds WalletConnect session', async () => {
        await page.reload()

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('span', 'Account:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Eth balance:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'Chain Id:'))).to.be.true
          expect(await page.isVisible(XPath.text('span', 'ETH2 staking contract holds:'))).to.be.true
        })

        await waitForExpect(async () => {
          expect(await page.isVisible(XPath.text('p', 'Send transaction'))).to.be.true
        })
      })

      it.only('Switches accounts', async () => {
        const wallet = Wallet.createRandom()
        await metamask.addAccount(wallet.privateKey)

        await page.goto(`${baseUrl}balance`)

        const getAccountAndBalance = async () => {
          await waitForExpect(async () => {
            expect(await page.isVisible(XPath.id('span', 'balance-page-account'))).to.be.true
            expect(await page.isVisible(XPath.id('span', 'balance-page-balance'))).to.be.true
          })

          let balance: BigNumber
          let address: string

          {
            const locator = page.locator(`${XPath.id('span', 'balance-page-balance')}`)
            const textContent = await locator.textContent()
            if (!textContent) {
              throw new Error('Balance for current account not found')
            }
            balance = utils.parseEther(textContent)
          }

          {
            const locator = page.locator(`${XPath.id('span', 'balance-page-account')}`)
            const textContent = await locator.textContent()
            if (!textContent) {
              throw new Error('Address for current account not found')
            }
            address = textContent
          }

          return { balance, address }
        }

        await waitForExpect(async () => {
          const { balance } = await getAccountAndBalance()
          expect(balance).to.be.eq(0)
        })

        await metamask.switchToNetwork('Localhost 8545')

        await waitForExpect(async () => {
          const { balance } = await getAccountAndBalance()
          expect(balance).to.be.eq(0)
        })

        await metamask.addAccount(defaultAccounts[1].secretKey)

        await waitForExpect(async () => {
          const wallet = new Wallet(defaultAccounts[1].secretKey)
          const { balance, address } = await getAccountAndBalance()
          expect(address).to.be.eq(wallet.address)
          const currentBalance = await wallet.getBalance()
          expect(balance).to.be.eq(currentBalance)
        })
      })
    })
  })
}
