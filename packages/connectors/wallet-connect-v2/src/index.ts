import { Chain, Connector, ConnectorEvent, ConnectorUpdateData } from '@usedapp/core'
import EthereumProvider from "@walletconnect/ethereum-provider"
import { BrowserProvider } from 'ethers'

interface WalletConnectV2ConnectorOptions {
  projectId: string,
  chains: Chain[],
  rpcMap?: Record<string, string>,
  checkGnosisSafe?: boolean,
}

export class WalletConnectV2Connector implements Connector {
  public provider?: BrowserProvider
  public readonly name = 'WalletConnectV2'

  readonly update = new ConnectorEvent<ConnectorUpdateData>()

  private ethereumProvider: EthereumProvider | undefined
  private readonly chains: number[]

  constructor(private readonly opts: WalletConnectV2ConnectorOptions) {
    this.chains = opts.chains.map((chain) => chain.chainId)
  }

  private async init() {
    this.ethereumProvider = await EthereumProvider.init({
      projectId: this.opts.projectId,
      chains: this.chains,
      showQrModal: true,
    })
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()
      if (!this.ethereumProvider) {
        throw new Error('Could not initialize connector')
      }
      const accounts = await this.ethereumProvider.request({ method: "eth_accounts" }) as string[]

      const chainId = await this.ethereumProvider.request({ method: "eth_chainId" }) as any
      this.provider = new BrowserProvider(this.ethereumProvider)
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()
      if (!this.ethereumProvider) {
        throw new Error('Could not initialize connector')
      }
      await this.ethereumProvider.connect({
        chains: this.chains,
      })

      const accounts = await this.ethereumProvider.request({ method: "eth_accounts" }) as string[]

      const chainId = await this.ethereumProvider.request({ method: "eth_chainId" }) as any
      this.provider = new BrowserProvider(this.ethereumProvider)
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e: any) {
      console.log(e)
      throw new Error('Could not activate connector: ' + (e.message ?? ''))
    }
  }

  async deactivate(): Promise<void> {
    this.ethereumProvider?.disconnect()
    this.provider = undefined
  }
}
