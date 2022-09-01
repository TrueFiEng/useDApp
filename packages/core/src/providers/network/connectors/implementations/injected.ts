import { providers } from 'ethers'
import { Connector, Update } from '../connector'
import { Event } from '../../../../helpers/event'

export class InjectedConnector implements Connector {
  public provider?: providers.Web3Provider | providers.JsonRpcProvider

  readonly update = new Event<Update>()

  constructor(provider: providers.ExternalProvider | providers.Web3Provider | providers.JsonRpcProvider) {
    this.provider = providers.Provider.isProvider(provider) ? provider : new providers.Web3Provider(provider)
  }

  async activate(): Promise<void> {
    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.log(error)
    }
  }

  async deactivate(): Promise<void> {
    this.provider = undefined
    this.update.emit({ chainId: 0, accounts: [] })
  }
}
