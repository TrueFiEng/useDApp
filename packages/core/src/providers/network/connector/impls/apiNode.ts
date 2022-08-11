import { providers } from 'ethers'
import { Connector, ConnectorPriority, UpdateFn } from '../connector'

export class ApiNodeConnector implements Connector {
  static tag = 'apiNode'

  public provider?: providers.JsonRpcProvider
  public priority = ConnectorPriority.ApiNode
  public name = 'ApiNode'

  onUpdate?: UpdateFn | undefined

  constructor(url: string) {
    this.provider = new providers.JsonRpcProvider(url)
  }

  getTag(): string {
    return ApiNodeConnector.tag
  }

  async connectEagerly() {
    const chainId: string = await this.provider!.send('eth_chainId', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts: [] })
  }

  async activate() {
    const chainId: string = await this.provider!.send('eth_chainId', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts: [] })
  }

  async deactivate() {
    this.onUpdate?.({ chainId: 0, accounts: [] })
  }
}
