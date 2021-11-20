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
} from '@usedapp/core'
import { JsonRpcProvider } from '@ethersproject/providers'
import { State } from 'reactive-properties'

export type BlockNumber = ReturnType<typeof useBlockNumber>
export type BlockMeta = ReturnType<typeof useBlockMeta>
export type EtherBalance = ReturnType<typeof useEtherBalance>
export type TokenBalance = ReturnType<typeof useTokenBalance>

export type OnUpdate<T> = (newValue: T) => void | Promise<void>

// TODO:
// Squeeze the calls through multicall
// Unsubscription
// Try to use in a backend
// Try to reimplemnent the React hooks and use on the frontend.
// sending tx - useSendTransaction | SCRATCH that, KISS
// Extract boilerplate if possible. useContractCall.
// Websockets, try out with curl
// Clean app (remove from chainCalls array on sunsub, watch multiple subs & unsubs)

export class DAppService {
  private _refreshing = false
  private web3Provider: JsonRpcProvider
  private _unsubscribe: (() => void) | undefined

  private _blockNumberState = new State<BlockNumber>(undefined)

  private _chainState = new State<ChainState>({})
  private _chainCalls: ChainCall[] = []

  constructor(private config: Config, private chainId: ChainId) {
    if (!this.config.readOnlyUrls?.[chainId]) {
      throw new Error(`Missing URL for chainId "${chainId}".`)
    }
    this.web3Provider = new JsonRpcProvider(this.config.readOnlyUrls[chainId], 'any')
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
    this.web3Provider.on('block', update)
    const onNewBlock = () => this.refresh()
    const unsub = this._blockNumberState.subscribe(onNewBlock)
    this._unsubscribe = () => {
      unsub()
      this.web3Provider.off('block', update)
    }
  }

  stop() {
    this._unsubscribe?.()
    this._unsubscribe = undefined
  }

  async refresh() {
    if (this._refreshing) return
    this._refreshing = true
    try {
      const blockNumber = this.blockNumber
      const multicallAddress = this.multicallAddress
      if (!blockNumber || !multicallAddress) return
      console.log(
        `Block number ${blockNumber}, refreshing ${this._chainCalls.length} unique out of ${this._chainCalls.length} calls...`
      )

      const newState = await multicall(this.web3Provider, multicallAddress, blockNumber, this._chainCalls)
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

  chainState(address: string | undefined, data: string) {
    if (!address) return undefined
    return this._chainState.get()[address]?.[data]
  }

  useChainState(address: string | undefined, data: string, onUpdate: OnUpdate<string | undefined>) {
    if (!address) return () => {} // eslint-disable-line @typescript-eslint/no-empty-function
    return this._chainState.subscribe(() => onUpdate(this.chainState(address, data)))
  }

  private addCall(call: ChainCall) {
    this._chainCalls.push(call)
  }

  private removeCall(call: ChainCall) {
    const index = this._chainCalls.findIndex((x) => x.address === call.address && x.data === call.data)
    if (index !== -1) {
      this._chainCalls = this._chainCalls.filter((_, i) => i !== index)
    }
  }

  useBlockMeta(onUpdate: OnUpdate<BlockMeta>) {
    const address = this.multicallAddress
    if (!address) return
    const call: ChainCall = {
      address,
      data: GET_CURRENT_BLOCK_TIMESTAMP_CALL,
    }

    this.addCall(call)

    const unsub = this.useChainState(address, GET_CURRENT_BLOCK_TIMESTAMP_CALL, () =>
      onUpdate({
        difficulty: parseDifficulty(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_DIFFICULTY_CALL)),
        timestamp: parseTimestamp(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_TIMESTAMP_CALL)),
      })
    )

    return () => {
      unsub()
      this.removeCall(call)
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
    const call = encodeCallData(contractCall)
    if (!call) return
    this.addCall(call)

    const unsub = this.useChainState(call.address, call.data, (result) => {
      if (result) {
        onUpdate(contractCall.abi.decodeFunctionResult(contractCall.method, result)[0])
      }
    })

    return () => {
      unsub()
      this.removeCall(call)
    }
  }

  useTokenBalance(tokenAddress: string, address: string, onUpdate: OnUpdate<TokenBalance>) {
    if (!this.multicallAddress) return
    const contractCall: ContractCall = {
      abi: ERC20Interface,
      address: tokenAddress,
      method: 'balanceOf',
      args: [address],
    }
    const call = encodeCallData(contractCall)
    if (!call) return
    this.addCall(call)

    const unsub = this.useChainState(call.address, call.data, (result) => {
      if (result) {
        onUpdate(contractCall.abi.decodeFunctionResult(contractCall.method, result)[0])
      }
    })

    return () => {
      unsub()
      this.removeCall(call)
    }
  }
}
