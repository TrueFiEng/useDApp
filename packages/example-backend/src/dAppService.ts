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
  ERC20Interface
} from '@usedapp/core'
import { JsonRpcProvider } from '@ethersproject/providers'
import { State } from 'reactive-properties'

type BlockNumber = ReturnType<typeof useBlockNumber>
type BlockMeta = ReturnType<typeof useBlockMeta>
type EtherBalance = ReturnType<typeof useEtherBalance>
type TokenBalance = ReturnType<typeof useTokenBalance>

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
  private web3Provider: JsonRpcProvider
  private _unsubscribe: Function | undefined

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

  start () {
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
    try {
      console.log(`Block number ${this.blockNumber}, refreshing...`)

      // Call multicall here and update the blockchain state.

      console.log('Refresh completed.')
    } catch (e: any) {
      console.error(e)
      // This is a hackathon so no proper error handling.
    }
  }

  chainState(address: string | undefined, data: string) {
    if (!address) return undefined
    return this._chainState.get()[address]?.[data]
  }

  useChainState(address: string | undefined, data: string, onUpdate: (state: string | undefined) => void) {
    if (!address) return () => {}
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

  useBlockMeta(onUpdate: (blockMeta: BlockMeta) => void) {
    const address = this.multicallAddress
    if (!address) return
    const call: ChainCall = {
      address,
      data: GET_CURRENT_BLOCK_TIMESTAMP_CALL
    }

    this.addCall(call)

    const unsub = this.useChainState(address, GET_CURRENT_BLOCK_TIMESTAMP_CALL, () => onUpdate({
      difficulty: parseDifficulty(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_DIFFICULTY_CALL)),
      timestamp: parseTimestamp(this.chainState(this.multicallAddress, GET_CURRENT_BLOCK_TIMESTAMP_CALL)),
    }))

    return () => {
      unsub()
      this.removeCall(call)
    }
  }

  useEtherBalance(address: string, onUpdate: (etherBalance: EtherBalance) => void) {
    if (!this.multicallAddress) return
    const contractCall: ContractCall = {
      abi: MultiCallABI,
      address: this.multicallAddress,
      method: 'getEthBalance',
      args: [address],
    }
    const call = encodeCallData(contractCall)
    if (!call) return

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

  useTokenBalance(tokenAddress: string, address: string, onUpdate: (tokenBalance: TokenBalance) => void) {
    if (!this.multicallAddress) return
    const contractCall: ContractCall = {
      abi: ERC20Interface,
      address: tokenAddress,
      method: 'balanceOf',
      args: [address],
    }
    const call = encodeCallData(contractCall)
    if (!call) return

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
