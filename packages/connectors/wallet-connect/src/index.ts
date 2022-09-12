import { Connector } from '@usedapp/core'
import { providers } from 'ethers'
import { Event, Update } from '@usedapp/core/dist/cjs/src/internal'

import WalletConnectProvider from '@walletconnect/web3-provider'
import type { IWalletConnectProviderOptions } from '@walletconnect/types'

export class WalletConnectConnector implements Connector {
  public provider?: providers.Web3Provider

  readonly update = new Event<Update>()

  constructor(private opts: IWalletConnectProviderOptions) {}

  private async init() {
    if (this.provider) return
    const walletConnectProvider = new WalletConnectProvider(this.opts)
    this.provider = new providers.Web3Provider(walletConnectProvider)
    await (this.provider?.provider as WalletConnectProvider).enable()
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
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

