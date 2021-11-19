import { ChainId, Config, BlockNumberContext, useBlockMeta, useBlockNumber } from '@usedapp/core'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Callback, State } from 'reactive-properties'

type BlockNumber = ReturnType<typeof useBlockNumber>
interface BlockNumberStateBundle {
  state: State<BlockNumber>
  unsubscribe?: () => void
}

type BlockMeta = ReturnType<typeof useBlockMeta>
interface BlockMetaStateBundle {
  state: State<BlockMeta>
  unsubscribe?: () => void
}

export class DAppService {
  private web3Provider: JsonRpcProvider

  private _blockNumberState: BlockNumberStateBundle | undefined
  private _blockMetaState: BlockMetaStateBundle | undefined

  constructor(private config: Config, private chainId: ChainId) {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    this.web3Provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
  }

  protected blockNumberState() {
    if (!this._blockNumberState) {
      const state = new State<BlockNumber>(undefined)
      const update = (blockNumber: number) => state.set(blockNumber)
      this.web3Provider.on('block', update)
      const unsubscribe = () => this.web3Provider.off('block', update)
      this._blockNumberState = { state, unsubscribe }
    }
    return this._blockNumberState!
  }

  get blockNumber() {
    return this.blockNumberState().state.get()
  }

  useBlockNumber(onUpdate: (blockNumber: BlockNumber) => void) {
    return this.blockNumberState().state.subscribe(() => onUpdate(this.blockNumber))
  }

  protected blockMetaState() {
    if (!this._blockMetaState) {
      const blockNumberState = this.blockNumberState().state
      const state = new State<BlockMeta>({ timestamp: undefined, difficulty: undefined })
      const cb: Callback = () => {
        const blockNumber = blockNumberState.get()
      }
      const unsubscribe = blockNumberState.subscribe(cb)
      this._blockMetaState = { state, unsubscribe }
    }
    return this._blockMetaState!
  }

  get blockMeta() {
    return this.blockMetaState().state.get()
  }

  useBlockMeta(onUpdate: (blockMeta: BlockMeta) => void) {
    return this.blockMetaState().state.subscribe(() => onUpdate(this.blockMeta))
  }

  protected etherBalanceState() {}

  stop() {
    // TODO: Unsubscriptions and disconnections.
  }
}
