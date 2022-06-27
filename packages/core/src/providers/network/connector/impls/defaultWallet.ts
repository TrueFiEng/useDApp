import { providers } from 'ethers'
import { Connector, ConnectorPriority, UpdateFn } from '../connector'

export class DefaultWalletConnector implements Connector {
  static tag = 'defaultWallet'

  public provider?: providers.Web3Provider | providers.JsonRpcProvider
  public priority = ConnectorPriority.Wallet
  public name = 'DefaultWallet'

  onUpdate?: UpdateFn

  constructor(provider:  providers.ExternalProvider | providers.Web3Provider | providers.JsonRpcProvider) {
    this.provider = providers.Provider.isProvider(provider) ? provider : new providers.Web3Provider(provider)
  }

  public getTag(): string {
    return DefaultWalletConnector.tag
  }

  async connectEagerly(): Promise<void> {
    if (!this.provider) {
      return
    }
    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.log(error)
    }
  }

  async activate(): Promise<void> {
    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.log(error)
    }
  }

  async deactivate(): Promise<void> {
    return
  }
}
