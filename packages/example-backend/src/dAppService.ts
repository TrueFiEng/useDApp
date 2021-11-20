import {
  ChainId,
  Config,
  useBlockMeta,
  useBlockNumber,
  useEtherBalance,
  useTokenBalance,
  ChainCall,
  MultiCallABI,
  GET_CURRENT_BLOCK_TIMESTAMP_CALL,
  GET_CURRENT_BLOCK_DIFFICULTY_CALL,
  parseDifficulty,
  parseTimestamp,
  ChainState,
  ContractCall,
  encodeCallData,
  ERC20Interface,
  multicall,
  getUnique
} from '@usedapp/core'
import { JsonRpcProvider } from '@ethersproject/providers'
import { State } from 'reactive-properties'
import { synchronized } from '@dxos/async'
import { latch } from './util'

export type BlockNumber = ReturnType<typeof useBlockNumber>
export type BlockTimestamp = ReturnType<typeof useBlockMeta>['timestamp']
export type BlockDifficulty = ReturnType<typeof useBlockMeta>['difficulty']
export type EtherBalance = ReturnType<typeof useEtherBalance>
export type TokenBalance = ReturnType<typeof useTokenBalance>

export type OnUpdate<T> = (newValue: T) => void | Promise<void>
export interface UseChainCallResult<T = string | undefined> {
  unsubscribe: () => void
  value: undefined | Promise<T>
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyChainCallResult: UseChainCallResult<any> = { unsubscribe: () => {}, value: undefined }

export class DAppService {
  private _lastProcessedBlock: number | undefined = undefined
  private _lastProcessedCalls: string | undefined = undefined
  private _web3Provider: JsonRpcProvider
  private _unsubscribe: (() => void) | undefined

  private _blockNumberState = new State<BlockNumber>(undefined)
  private _chainState = new State<ChainState>({})
  private _chainCalls = new State<ChainCall[]>([])

  constructor(private config: Config, private chainId: ChainId) {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    this._web3Provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
  }

  get multicallAddress() {
    return this.config.multicallAddresses?.[this.chainId]
  }

  get blockNumber() {
    return this._blockNumberState.get()
  }

  useBlockNumber(onUpdate: (blockNumber: BlockNumber) => void) {
    return this._blockNumberState.subscribe(() => onUpdate(this.blockNumber))
  }

  start() {
    if (this._unsubscribe) return // Already started.
    const update = (blockNumber: number) => this._blockNumberState.set(blockNumber)
    this._web3Provider.on('block', update)

    const unsubscribeBlockNumber = this._blockNumberState.subscribe(() => this.refresh()) // Refresh on block number change.
    const unsubscribeCalls = this._chainCalls.subscribe(() => this.refresh()) // Refresh on a change in a list of calls.
    this._unsubscribe = () => {
      unsubscribeBlockNumber()
      unsubscribeCalls()
      this._web3Provider.off('block', update)
    }
  }

  stop() {
    this._unsubscribe?.()
    this._unsubscribe = undefined
  }

  @synchronized
  private async refresh() {
    try {
      const blockNumber = this.blockNumber
      if (!blockNumber || !this.multicallAddress) return
      const chainCalls = this._chainCalls.get()
      const uniqueCalls = getUnique(chainCalls)
      if ((this._lastProcessedBlock ?? 0 >= blockNumber) && this._lastProcessedCalls === JSON.stringify(uniqueCalls)) {
        // The state for this block number and exactly these calls has already been updated.
        return
      }

      const newState = await multicall(this._web3Provider, this.multicallAddress, blockNumber, uniqueCalls)
      this._chainState.set(newState)

      this._lastProcessedBlock = blockNumber
      this._lastProcessedCalls = JSON.stringify(uniqueCalls)
    } catch (e) {
      console.error('Refresh failed.')
      console.error(e)
    }
  }

  protected chainState(address: string | undefined, data: string) {
    if (!address) return undefined
    return this._chainState.get()[address]?.[data]
  }

  protected useChainState(address: string | undefined, data: string, onUpdate: OnUpdate<string | undefined>) {
    if (!address) return () => {} // eslint-disable-line @typescript-eslint/no-empty-function
    return this._chainState.subscribe(() => onUpdate(this.chainState(address, data)))
  }

  @synchronized
  protected addCall(call: ChainCall) {
    this._chainCalls.set([...this._chainCalls.get(), call])
  }

  @synchronized
  protected removeCall(call: ChainCall) {
    const chainCalls = this._chainCalls.get()
    const index = chainCalls.findIndex(x => x.address === call.address && x.data === call.data)
    if (index !== -1) {
      this._chainCalls.set(chainCalls.filter((_, i) => i !== index))
    }
  }

  protected useChainCall(call: ChainCall, onUpdate?: OnUpdate<string | undefined>): UseChainCallResult {
    const [value, setValue] = latch<string | undefined>()
    this.addCall(call)

    const unsub = this.useChainState(call.address, call.data, result => {
      if (result !== undefined) {
        setValue(result)
        onUpdate?.(result)
      }
    })

    return {
      unsubscribe: () => {
        unsub()
        this.removeCall(call)
      },
      value
    }
  }

  protected useContractCall<T>(contractCall: ContractCall, onUpdate?: OnUpdate<T>): UseChainCallResult<T> {
    const [value, setValue] = latch<T>()
    const call = encodeCallData(contractCall)
    if (!call) return emptyChainCallResult

    const { unsubscribe } = this.useChainCall(call, result => {
      const decoded: T | undefined = result
        ? contractCall.abi.decodeFunctionResult(contractCall.method, result)[0]
        : undefined
      if (decoded !== undefined) {
        setValue(decoded)
        onUpdate?.(decoded)
      }
    })

    return {
      unsubscribe,
      value
    }
  }

  useBlockTimestamp(onUpdate?: OnUpdate<BlockTimestamp>): UseChainCallResult<BlockTimestamp> {
    if (!this.multicallAddress) return emptyChainCallResult
    const call: ChainCall = {
      address: this.multicallAddress,
      data: GET_CURRENT_BLOCK_TIMESTAMP_CALL
    }

    const { unsubscribe, value } = this.useChainCall(call, result => {
      result && onUpdate?.(parseTimestamp(result))
    })

    return {
      unsubscribe,
      value: (async () => parseTimestamp(await value))()
    }
  }

  useBlockDifficulty(onUpdate?: OnUpdate<BlockDifficulty>): UseChainCallResult<BlockDifficulty> {
    if (!this.multicallAddress) return emptyChainCallResult
    const call: ChainCall = {
      address: this.multicallAddress,
      data: GET_CURRENT_BLOCK_DIFFICULTY_CALL
    }

    const { unsubscribe, value } = this.useChainCall(call, result => {
      result && onUpdate?.(parseDifficulty(result))
    })

    return {
      unsubscribe,
      value: (async () => parseDifficulty(await value))()
    }
  }

  useEtherBalance(address: string, onUpdate?: OnUpdate<EtherBalance>): UseChainCallResult<EtherBalance> {
    if (!this.multicallAddress) return emptyChainCallResult
    const contractCall: ContractCall = {
      abi: MultiCallABI,
      address: this.multicallAddress,
      method: 'getEthBalance',
      args: [address]
    }

    return this.useContractCall(contractCall, onUpdate)
  }

  useTokenBalance(
    tokenAddress: string,
    address: string,
    onUpdate?: OnUpdate<TokenBalance>
  ): UseChainCallResult<TokenBalance> {
    if (!this.multicallAddress) return emptyChainCallResult
    const contractCall: ContractCall = {
      abi: ERC20Interface,
      address: tokenAddress,
      method: 'balanceOf',
      args: [address]
    }

    return this.useContractCall(contractCall, onUpdate)
  }
}
