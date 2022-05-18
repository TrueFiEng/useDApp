import { Web3Provider } from '@ethersproject/providers'
import { Connector, ConnectorPriority, UpdateFn } from '../connector'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { IWalletConnectProviderOptions } from '@walletconnect/types'

export class WalletConnectConnector implements Connector {
  public provider?: Web3Provider
  public priority = ConnectorPriority.Wallet
  public name = 'WalletConnect'

  constructor(private opts: IWalletConnectProviderOptions) {}

  onUpdate?: UpdateFn

  private async init() {
    if (this.provider) return
    this.provider = new Web3Provider(new WalletConnectProvider(this.opts))
  }

  async connectEagerly(): Promise<void> {
    await this.init()

    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_accounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts })
  }

  async activate(): Promise<void> {
    await this.init()
    const chainId: string = await this.provider!.send('eth_chainId', [])
    const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
    this.onUpdate?.({ chainId: parseInt(chainId), accounts })
  }

  async deactivate(): Promise<void> {
    return
  }
}
