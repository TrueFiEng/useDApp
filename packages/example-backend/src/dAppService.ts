import { ChainId, Config, BlockNumberContext, useBlockMeta } from "@usedapp/core";
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'

type GetInnerType<S> = S extends React.Context<infer T> ? T : never
interface Web3ProviderBundle {
  provider: JsonRpcProvider,
  unsubscribe: () => void
}

export class DAppService {
  private web3Providers: Map<ChainId, Web3ProviderBundle> = new Map()

  private blockNumberProviders: Map<ChainId, GetInnerType<typeof BlockNumberContext>> = new Map()
  private blockMetaProviders: Map<ChainId, ReturnType<typeof useBlockMeta>> = new Map()

  constructor (private config: Config) { }

  // public chain(chainId: ChainId) {
  //   return new Proxy(this, {

  //   })
  // }

  public web3Provider(chainId: ChainId) {
    if (!this.web3Providers.has(chainId)) {
      this.web3Providers.set(chainId, this.createWeb3Provider(chainId))
    }
    return this.web3Providers.get(chainId)
  }

  protected createWeb3Provider(chainId: ChainId): Web3ProviderBundle {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    const provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
    const update = (blockNumber: number) => this.blockNumberProviders.set(chainId, blockNumber)
    provider.on('block', update)
    return {
      provider,
      unsubscribe: () => provider.off('block', update)
    }
  }

  useBlockNumber(chainId: ChainId) {
    return this.blockNumberProviders.get(chainId)
  }

  useBlockMeta() {

  }

  public stop() {

  }
}
