import { providers } from 'ethers'
import { Connector, ConnectorPriority, UpdateFn } from '../connector'

export class InjectedConnector implements Connector {
  static tag = 'injected'

  public provider?: providers.Web3Provider | providers.JsonRpcProvider
  public priority = ConnectorPriority.Wallet
  public name = 'Injected'

  onUpdate?: UpdateFn

  constructor(provider: providers.ExternalProvider | providers.Web3Provider | providers.JsonRpcProvider) {
    this.provider = providers.Provider.isProvider(provider) ? provider : new providers.Web3Provider(provider)
  }

  public getTag(): string {
    return InjectedConnector.tag
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
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.log(error)
    }
  }

  async deactivate(): Promise<void> {
    this.onUpdate?.({ chainId: 0, accounts: [] })
  }
}
