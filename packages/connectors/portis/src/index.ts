import { Connector } from '@usedapp/core'
import { providers } from 'ethers'
import { Event, Update } from '@usedapp/core/dist/cjs/src/internal'
import Portis, { INetwork, IOptions } from '@portis/web3'

export class PortisConnector implements Connector {
  public provider?: providers.Web3Provider

  readonly update = new Event<Update>()

  constructor(
    private dappId: string,
    private network: string | INetwork,
    private chainId: number,
    private options?: IOptions
  ) {}

  private async init() {
    if (this.provider) return
    const portis = new Portis(this.dappId, this.network, this.options)
    await portis.provider.enable()
    this.provider = new providers.Web3Provider(portis.provider)
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: this.chainId, accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: this.chainId, accounts })
    } catch (e) {
      console.log(e)
      throw new Error('Could not activate connector')
    }
  }

  async deactivate(): Promise<void> {
    this.provider = undefined
  }
}
