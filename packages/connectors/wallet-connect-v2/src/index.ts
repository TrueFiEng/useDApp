import { Chain, Connector, ConnectorEvent, ConnectorUpdateData, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core'
import UniversalProvider from "@walletconnect/universal-provider"
import { Web3Modal } from "@web3modal/standalone"
import { providers } from 'ethers'

interface WalletConnectV2ConnectorOptions {
  projectId: string,
  chains: Chain[],
  rpcMap?: Record<string, string>,
  checkGnosisSafe?: boolean,
}

export class WalletConnectV2Connector implements Connector {
  public provider?: providers.Web3Provider
  public readonly name = 'WalletConnectV2'

  readonly update = new ConnectorEvent<ConnectorUpdateData>()

  private universalProvider: UniversalProvider | undefined
  private web3Modal: Web3Modal | undefined
  private readonly chains: string[]
  private readonly methods: string[]
  private readonly events: string[]

  constructor(private readonly opts: WalletConnectV2ConnectorOptions) {
    this.chains = opts.chains.map((chain) => `eip155:${chain.chainId}`)
    this.methods = [
      "eth_sendTransaction",
      "eth_signTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData",
    ]
    this.events = ["chainChanged", "accountsChanged"]
  }

  private async init() {
    this.universalProvider = await UniversalProvider.init({
      projectId: this.opts.projectId,
    });
  }

  async connectEagerly(): Promise<void> {
    try {
      await this.init()
      if (!this.universalProvider) {
        throw new Error('Could not initialize connector')
      }
      const accounts = await this.universalProvider.request({ method: "eth_accounts" }) as string[]

      if (this.opts.checkGnosisSafe && accounts[0]) {
        await this.tryToGuessGnosisChain(accounts[0])
      }

      const chainId = await this.universalProvider.request({ method: "eth_chainId" }) as any
      this.provider = new providers.Web3Provider(this.universalProvider)
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    try {
      await this.init()
      if (!this.universalProvider) {
        throw new Error('Could not initialize connector')
      }
      this.web3Modal = new Web3Modal({
        walletConnectVersion: 2,
        projectId: this.opts.projectId,
        standaloneChains: this.chains,
      })

      this.universalProvider.on("display_uri", (uri: string) => {
        this.web3Modal?.openModal({ uri, standaloneChains: this.chains })
      });
      await this.universalProvider.connect({
        namespaces: {
          eip155: {
            methods: this.methods,
            chains: this.chains,
            events: this.events,
            rpcMap: this.opts.rpcMap,
          },
        },
      });
      this.web3Modal?.closeModal()

      const accounts = await this.universalProvider.request({ method: "eth_accounts" }) as string[]

      if (this.opts.checkGnosisSafe && accounts[0]) {
        await this.tryToGuessGnosisChain(accounts[0])
      }

      const chainId = await this.universalProvider.request({ method: "eth_chainId" }) as any
      this.provider = new providers.Web3Provider(this.universalProvider)
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e: any) {
      console.log(e)
      throw new Error('Could not activate connector: ' + (e.message ?? ''))
    }
  }

  private async tryToGuessGnosisChain(safeAddress: string) {
    const resolvedChainIds: number[] = []
    await Promise.all(this.opts.chains.map(async ({ chainId }) => {
      const chainName = DEFAULT_SUPPORTED_CHAINS
        .find(({ chainId: id }) => id === chainId)
        ?.chainName
        ?.toLowerCase()
      if (!chainName) {
        return
      }
      try {
        const response = await fetch(
          `https://safe-transaction.${chainName}.gnosis.io/api/v1/safes/${safeAddress}/`
        )
        if (response.ok) {
          resolvedChainIds.push(chainId)
        }
      } catch {}
    }))
    if (resolvedChainIds.length > 0) {
      // if found on multiple chains, set the default to the first one
      // preserving the order in which the chains are defined
      const defaultChainId = this.opts.chains.filter(({ chainId }) => resolvedChainIds.includes(chainId))[0].chainId
      this.universalProvider?.setDefaultChain(`eip155:${defaultChainId}`)
    }
  }

  async deactivate(): Promise<void> {
    this.universalProvider?.disconnect()
    this.provider = undefined
  }
}
