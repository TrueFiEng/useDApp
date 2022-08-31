import { providers } from 'ethers'
import { Connector, ConnectorPriority, Update } from '../connector'
import { Event } from '../../../../helpers/event'

export class TestingWalletConnector implements Connector {
  static tag = 'testingWallet'

  public provider?: providers.Web3Provider | providers.JsonRpcProvider
  public priority = ConnectorPriority.Wallet
  public name = 'TestingWallet'

  readonly update = new Event<Update>()

  constructor(provider: providers.ExternalProvider | providers.Web3Provider | providers.JsonRpcProvider) {
    this.provider = providers.Provider.isProvider(provider) ? provider : new providers.Web3Provider(provider)
  }

  public getTag(): string {
    return TestingWalletConnector.tag
  }

  async connectEagerly(): Promise<void> {
    if (!this.provider) {
      return
    }
    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      this.update.emit({ chainId: parseInt(chainId), accounts: [] })
    } catch (error) {
      console.debug(error)
    }
  }

  async activate(): Promise<void> {
    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      this.update.emit({ chainId: parseInt(chainId), accounts: [] })
    } catch (error) {
      console.log(error)
    }
  }

  async deactivate(): Promise<void> {
    this.update.emit({ chainId: 0, accounts: [] })
  }
}
