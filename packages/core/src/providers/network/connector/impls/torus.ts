import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import { providers } from 'ethers'
import Torus, { TorusParams } from '@toruslabs/torus-embed'

export class TorusConnector implements Connector {
  static tag = 'torus'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Torus'

  constructor(private torusParams: TorusParams) {}

  onUpdate?: UpdateFn

  public getTag(): string {
    return TorusConnector.tag
  }

  private async init() {
    const torus = new Torus()
    await torus.init(this.torusParams)
    await torus.login()
    this.provider = new providers.Web3Provider(torus.provider)
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
