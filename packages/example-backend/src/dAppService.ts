import { ChainId, Config, BlockNumberContext, useBlockMeta, useBlockNumber } from '@usedapp/core'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Callback, State } from 'reactive-properties'

interface Web3ProviderBundle {
  provider: JsonRpcProvider
  unsubscribe?: () => void
}

interface BlockNumberStateBundle {
  blockNumberState: State<ReturnType<typeof useBlockNumber>>
  unsubscribe?: () => void
}

export class DAppService {
  private web3Providers: Map<ChainId, Web3ProviderBundle> = new Map()

  private blockNumberStates: Map<ChainId, BlockNumberStateBundle> = new Map()
  private blockMetaStates: Map<ChainId, State<ReturnType<typeof useBlockMeta>>> = new Map()

  constructor(private config: Config) {}

  web3Provider(chainId: ChainId) {
    if (!this.web3Providers.has(chainId)) {
      this.web3Providers.set(chainId, this.createWeb3Provider(chainId))
    }
    return this.web3Providers.get(chainId)!
  }

  protected createWeb3Provider(chainId: ChainId): Web3ProviderBundle {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    const provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
    return { provider }
  }

  blockNumberState(chainId: ChainId) {
    if (!this.blockNumberStates.has(chainId)) {
      const provider = this.web3Provider(chainId).provider
      const blockNumberState = new State<number | undefined>(undefined)
      const update = (blockNumber: number) => blockNumberState.set(blockNumber)
      provider.on('block', update)
      const unsubscribe = () => provider.off('block', update)
      this.blockNumberStates.set(chainId, { blockNumberState, unsubscribe })
    }
    return this.blockNumberStates.get(chainId)!
  }

  blockNumber(chainId: ChainId) {
    return this.blockNumberState(chainId).blockNumberState.get()
  }

  useBlockNumber(chainId: ChainId, onUpdate: (blockNumber: number | undefined) => void) {
    return this.blockNumberState(chainId).blockNumberState
      .subscribe(() => onUpdate(this.blockNumber(chainId)))
  }

  useBlockMeta() {}

  stop() {
    // TODO: Unsubscriptions and disconnections.
  }
}
