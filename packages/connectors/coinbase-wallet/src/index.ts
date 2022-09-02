import { Connector } from '@usedapp/core'
import { providers } from 'ethers'
import { Event, Update } from '@usedapp/core/dist/cjs/src/internal'

import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

export class CoinbaseWalletConnector implements Connector {
  public provider?: providers.Web3Provider

  readonly update = new Event<Update>()

  constructor(private appName: string, private infuraKey: string) {}

  private async init() {
    if (this.provider) return
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: this.appName,
      darkMode: false,
    })

    const coinbaseProvider = coinbaseWallet.makeWeb3Provider(`https://mainnet.infura.io/v3/${this.infuraKey}`)
    this.provider = new providers.Web3Provider(coinbaseProvider as any)
  }

  async connectEagerly(): Promise<void> {
    await this.init()

    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    await this.init()

    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async deactivate(): Promise<void> {
    this.update.emit({ chainId: 0, accounts: [] })
    this.provider = undefined
  }
}
