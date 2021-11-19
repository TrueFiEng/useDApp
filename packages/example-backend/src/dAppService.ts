import {
  ChainId,
  Config,
  BlockNumberContext,
  useBlockMeta,
  useBlockNumber,
  useEtherBalance,
  useTokenBalance,
  ChainCall,
  MultiCallABI
} from '@usedapp/core'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Callback, State } from 'reactive-properties'

const GET_CURRENT_BLOCK_TIMESTAMP_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', [])
const GET_CURRENT_BLOCK_DIFFICULTY_CALL = MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', [])

interface StateBundle<T> {
  state: State<T>
  unsubscribe?: () => void
}

type BlockNumber = ReturnType<typeof useBlockNumber>
type BlockNumberStateBundle = StateBundle<BlockNumber>

type BlockMeta = ReturnType<typeof useBlockMeta>
type BlockMetaStateBundle = StateBundle<BlockMeta>

type EtherBalance = ReturnType<typeof useEtherBalance>
type EtherBalanceStateBundle = StateBundle<EtherBalance>

type TokenBalance = ReturnType<typeof useTokenBalance>
type TokenBalanceStateBundle = StateBundle<TokenBalance>

// TODO:
// Squeeze the calls through multicall
// Unsubscription
// Try to use in a backend
// Try to reimplemnent the React hooks and use on the frontend.
// Extract boilerplate if possible.

export class DAppService {
  private web3Provider: JsonRpcProvider

  private _blockNumberState: BlockNumberStateBundle | undefined
  private _blockMetaState: BlockMetaStateBundle | undefined
  private _etherBalanceState: Map<string, EtherBalanceStateBundle> = new Map()
  private _tokenBalanceState: Map<ChainCall['address'], Map<ChainCall['data'], TokenBalanceStateBundle>> = new Map()
  // private _calls: Map<ChainCall['address'], Map<ChainCall['data'],

  constructor(private config: Config, private chainId: ChainId) {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    this.web3Provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
  }

  get multicallAddress() {
    return this.config.multicallAddresses?.[this.chainId]
  }

  private blockNumberState() {
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

  private blockMetaState() {
    if (!this._blockMetaState) {
      const blockNumberState = this.blockNumberState().state
      const state = new State<BlockMeta>({ timestamp: undefined, difficulty: undefined })
      const cb: Callback = () => {
        const blockNumber = blockNumberState.get()
        // TODO: block meta based on block number.
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

  private etherBalanceState(address: string) {
    if (!this._etherBalanceState.has(address)) {
      const blockNumberState = this.blockNumberState().state
      const state = new State<EtherBalance>(undefined)
      const cb: Callback = () => {
        const blockNumber = blockNumberState.get()
        // TODO: ether balance based on block number.
      }
      const unsubscribe = blockNumberState.subscribe(cb)
      this._etherBalanceState.set(address, { state, unsubscribe })
    }
    return this._etherBalanceState.get(address)!
  }

  etherBalance(address: string) {
    return this.etherBalanceState(address).state.get()
  }

  useEtherBalance(address: string, onUpdate: (etherBalance: EtherBalance) => void) {
    return this.etherBalanceState(address).state.subscribe(() => onUpdate(this.etherBalance(address)))
  }

  private tokenBalanceState(tokenAddress: string, address: string) {
    if (!this._tokenBalanceState.has(tokenAddress)) {
      this._tokenBalanceState.set(tokenAddress, new Map())
    }
    const contractState = this._tokenBalanceState.get(tokenAddress)!
    if (!contractState.has(address)) {
      const blockNumberState = this.blockNumberState().state
      const state = new State<TokenBalance>(undefined)
      const cb: Callback = () => {
        const blockNumber = blockNumberState.get()
        // TODO: token balance based on block number.
      }
      const unsubscribe = blockNumberState.subscribe(cb)
      contractState.set(address, { state, unsubscribe })
    }
    return contractState.get(address)!
  }

  tokenBalance(tokenAddress: string, address: string) {
    return this.tokenBalanceState(tokenAddress, address).state.get()
  }

  useTokenBalance(tokenAddress: string, address: string, onUpdate: (tokenBalance: TokenBalance) => void) {
    return this.tokenBalanceState(tokenAddress, address).state.subscribe(() =>
      onUpdate(this.tokenBalance(tokenAddress, address))
    )
  }

  stop() {
    // TODO: Unsubscriptions and disconnections.
  }
}
