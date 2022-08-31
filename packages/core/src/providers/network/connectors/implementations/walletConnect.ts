import { Connector, ConnectorPriority, Update } from '../connector'
import WalletConnectProvider from '@walletconnect/web3-provider'
import type { IWalletConnectProviderOptions } from '@walletconnect/types'
import { providers } from 'ethers'
import { Event } from '../../../../helpers/event'

export class WalletConnectConnector implements Connector {
  static tag = 'walletconnect'
  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'WalletConnect'

  readonly update = new Event<Update>()

  constructor(private opts: IWalletConnectProviderOptions) {}

  private async init() {
    if (this.provider) return
    try {
      const walletConnectProvider = new WalletConnectProvider(this.opts)
      this.provider = new providers.Web3Provider(walletConnectProvider)
    } catch (e) {
      console.log(e)
    }
  }

  public getTag(): string {
    return WalletConnectConnector.tag
  }

  async connectEagerly(): Promise<void> {
    await this.init()
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
    try {
      await (this.provider?.provider as WalletConnectProvider).enable()
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.log(e)
    }
  }

  async deactivate(): Promise<void> {
    this.update.emit({ chainId: 0, accounts: [] })
  }
}
