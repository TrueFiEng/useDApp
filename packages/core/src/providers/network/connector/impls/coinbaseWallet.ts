import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import { providers } from 'ethers'

import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

export class CoinbaseWalletConnector implements Connector {
  static tag = 'coinbase'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Coinbase'

  constructor(private appName: string, private infuraKey: string) {}

  onUpdate?: UpdateFn

  public getTag(): string {
    return CoinbaseWalletConnector.tag
  }

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
    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_accounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts })
  }

  async activate(): Promise<void> {
    await this.init()

    if (!this.provider) {
      return
    }
    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_accounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts })
  }

  async deactivate(): Promise<void> {
    return
  }
}
