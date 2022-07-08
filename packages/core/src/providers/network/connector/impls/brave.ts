import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import { providers } from 'ethers'

export class BraveConnector implements Connector {
  static tag = 'brave'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Brave'

  onUpdate?: UpdateFn

  public getTag(): string {
    return BraveConnector.tag
  }

  private async init() {
    if (this.provider) return
    this.provider = new providers.Web3Provider(window.ethereum as any)
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
    const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts })
  }

  async deactivate(): Promise<void> {
    return
  }
}
