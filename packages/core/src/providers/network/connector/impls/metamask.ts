import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import { providers } from 'ethers'
import { getInjectedProvider } from '../../../../helpers'

export class MetamaskConnector implements Connector {
  static tag = 'metamask'

  public provider?: providers.Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'Metamask'

  onUpdate?: UpdateFn

  public getTag(): string {
    return MetamaskConnector.tag
  }

  private async init() {
    if (this.provider) return
    const metamask = await getInjectedProvider()
    if (!metamask) {
      return
    }
    this.provider = metamask
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
