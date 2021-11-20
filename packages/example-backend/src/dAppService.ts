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
import { synchronized } from '@dxos/async';
import { latch } from './util';

export type BlockNumber = ReturnType<typeof useBlockNumber>
export type BlockMeta = ReturnType<typeof useBlockMeta>
export type EtherBalance = ReturnType<typeof useEtherBalance>
export type TokenBalance = ReturnType<typeof useTokenBalance>

export type OnUpdate<T> = (newValue: T) => void | Promise<void>

export class DAppService {
  private _refreshing = false
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

    const unsub1 = this._blockNumberState.subscribe(() => this.refresh()) // Refresh on block number change.
    const unsub2 = this._chainCalls.subscribe(() => this.refresh()) // Refresh on a change in a list of calls.
    this._unsubscribe = () => {
      unsub1()
      unsub2()
      this._web3Provider.off('block', update)
    }
  }

  stop() {
    this._unsubscribe?.()
    this._unsubscribe = undefined
  }

  private async refresh() {
    if (this._refreshing) return
    this._refreshing = true
    try {
      const blockNumber = this.blockNumber
      const multicallAddress = this.multicallAddress
      const chainCalls = this._chainCalls.get()
      if (!blockNumber || !multicallAddress) return
      const uniqueCalls = getUnique(chainCalls)
      console.log(
        `\n\nBlock number ${blockNumber}, refreshing. `,
        `${uniqueCalls.length} unique out of ${chainCalls.length} calls...`
      )

      const newState = await multicall(this._web3Provider, multicallAddress, blockNumber, uniqueCalls)
      this._chainState.set(newState)

      console.log('Refresh completed.')
    } catch (e: any) {
      // This is a hackathon so no proper error handling.
      console.error('Refresh failed.')
      console.error(e)
    } finally {
      this._refreshing = false
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
    const index = chainCalls.findIndex((x) => x.address === call.address && x.data === call.data)
    if (index !== -1) {
      this._chainCalls.set(chainCalls.filter((_, i) => i !== index))
    }
  }

  protected useChainCall(call: ChainCall, onUpdate: OnUpdate<string | undefined>) {
    this.addCall(call)

    const unsub = this.useChainState(call.address, call.data, onUpdate)

    return () => {
      unsub()
      this.removeCall(call)
    }
  }

  protected useContractCall<T>(contractCall: ContractCall, onUpdate: OnUpdate<T>) {
    const call = encodeCallData(contractCall)
    if (!call) return

    return this.useChainCall(call, (result) => {
      result && onUpdate(contractCall.abi.decodeFunctionResult(contractCall.method, result)[0])
    })
  }

  useBlockMeta(onUpdate: OnUpdate<BlockMeta>) {
    if (!this.multicallAddress) return
    const call1: ChainCall = {
      address: this.multicallAddress,
      data: GET_CURRENT_BLOCK_DIFFICULTY_CALL,
    }
    const call2: ChainCall = {
      address: this.multicallAddress,
      data: GET_CURRENT_BLOCK_TIMESTAMP_CALL,
    }

    // useBlockMeta is a hook that really combines two hooks, useBlockDifficulty and useBlockTimestamp.
    const combinedUpdate = () => onUpdate({
      difficulty: parseDifficulty(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_DIFFICULTY_CALL)),
      timestamp: parseTimestamp(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_TIMESTAMP_CALL)),
    })
    
    // TODO: Add this.useChainCalls
    const unsub1 = this.useChainCall(call1, combinedUpdate)
    const unsub2 = this.useChainCall(call2, combinedUpdate)
    return () => {
      unsub1?.()
      unsub2?.()
    }
  }

  useEtherBalance(address: string, onUpdate: OnUpdate<EtherBalance>) {
    if (!this.multicallAddress) return
    const contractCall: ContractCall = {
      abi: MultiCallABI,
      address: this.multicallAddress,
      method: 'getEthBalance',
      args: [address],
    }

    return this.useContractCall(contractCall, onUpdate)
  }

  useTokenBalance(tokenAddress: string, address: string, onUpdate: OnUpdate<TokenBalance>) {
    if (!this.multicallAddress) return
    const contractCall: ContractCall = {
      abi: ERC20Interface,
      address: tokenAddress,
      method: 'balanceOf',
      args: [address],
    }
    
    return this.useContractCall(contractCall, onUpdate)
  }
}
