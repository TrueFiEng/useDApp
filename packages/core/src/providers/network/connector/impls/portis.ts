import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import Portis, { INetwork, IOptions } from '@portis/web3'
import { providers } from 'ethers'

export class PortisConnector implements Connector {
  static tag = 'portis'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Portis'

  constructor(private dappId: string, private network: string | INetwork, private options?: IOptions) {}

  public getTag(): string {
    return PortisConnector.tag
  }

  onUpdate?: UpdateFn

  private async init() {
    if (this.provider) return
    const portis = new Portis(this.dappId, this.network, this.options)
    this.provider = portis.web3Provider
  }

  async connectEagerly(): Promise<void> {
    // await this.init()
    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.log(e)
    }
  }

  async activate(): Promise<void> {
    await this.init()
    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.log(e)
    }
  }

  async deactivate(): Promise<void> {
    return
  }
}
