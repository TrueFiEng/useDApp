import { Connector } from '@usedapp/core'
import { providers } from 'ethers'
import { Event, Update } from '@usedapp/core/dist/cjs/src/internal'
import Portis, { INetwork, IOptions } from '@portis/web3'

export class PortisConnector implements Connector {
  public provider?: providers.Web3Provider
  public portis: Portis | undefined

  readonly update = new Event<Update>()

  constructor(
    private dappId: string,
    private network: string | INetwork,
    private options?: IOptions
  ) {}

  private async init() {
    if (this.provider) return
    this.portis = new Portis(this.dappId, this.network, this.options)
    await this.portis.provider.enable()
    this.provider = new providers.Web3Provider(this.portis.provider)
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      const chainId: string = await this.provider!.send('eth_chainId', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      const chainId: string = await this.provider!.send('eth_chainId', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.log(e)
      throw new Error('Could not activate connector')
    }
  }

  async deactivate(): Promise<void> {
    this.provider = undefined
  }
}
