import { providers } from 'ethers'
import { DEFAULT_CONFIG } from '../../../../model/config/default'
import { Connector, ConnectorPriority, Update } from '../connector'
import { Event } from '../../../../helpers/event'

export class ApiNodeConnector implements Connector {
  static tag = 'apiNode'

  public provider?: providers.JsonRpcProvider
  public priority = ConnectorPriority.ApiNode
  public name = 'ApiNode'

  readonly update = new Event<Update>()

  constructor(url: string, pollingInterval = DEFAULT_CONFIG.pollingInterval) {
    this.provider = new providers.JsonRpcProvider(url)
    this.provider.pollingInterval = pollingInterval
  }

  getTag(): string {
    return ApiNodeConnector.tag
  }

  async connectEagerly() {
    const chainId: string = await this.provider!.send('eth_chainId', [])
    this.update.emit({ chainId: parseInt(chainId), accounts: [] })
  }

  async activate() {
    const chainId: string = await this.provider!.send('eth_chainId', [])
    this.update.emit({ chainId: parseInt(chainId), accounts: [] })
  }

  async deactivate() {
    this.update.emit({ chainId: 0, accounts: [] })
  }
}
