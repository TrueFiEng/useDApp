import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import { providers } from 'ethers'
import Fortmatic from 'fortmatic'

export class FortmaticConnector implements Connector {
  static tag = 'fortmatic'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Fortmatic'

  constructor(private apiKey: string) {}

  onUpdate?: UpdateFn

  public getTag(): string {
    return FortmaticConnector.tag
  }

  private async init() {
    if (this.provider) return
    const fortmaticProvider = new Fortmatic(this.apiKey).getProvider()
    await fortmaticProvider.enable()
    if (!fortmaticProvider) {
      return
    }
    this.provider = new providers.Web3Provider(fortmaticProvider as any)
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()

      if (!this.provider) {
        return
      }

      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (err) {
      console.warn(err)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()

      if (!this.provider) {
        return
      }

      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
      this.onUpdate?.({ chainId: parseInt(chainId), accounts })
    } catch (err) {
      console.warn(err)
    }
  }

  async deactivate(): Promise<void> {
    return
  }
}
