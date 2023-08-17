import { Connector, ConnectorUpdateData } from '../connector'
import { Event } from '../../../../helpers/event'
import { BrowserProvider, JsonRpcProvider } from 'ethers'

export class InjectedConnector implements Connector {
  public provider?: BrowserProvider | JsonRpcProvider
  public readonly name = 'Injected'

  readonly update = new Event<ConnectorUpdateData>()

  constructor(provider: BrowserProvider | JsonRpcProvider) {
    this.provider = provider
  }

  async connectEagerly(): Promise<void> {
    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.debug(error)
    }
  }

  async activate(): Promise<void> {
    if (!this.provider) {
      throw new Error('Could not activate connector')
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (error) {
      console.log(error)
      throw new Error('Could not activate connector')
    }
  }

  async deactivate(): Promise<void> {
    this.provider = undefined
  }
}
