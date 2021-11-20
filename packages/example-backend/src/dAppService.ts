import {
  ChainCall,
  ContractCall,
  ERC20Interface,
  GET_CURRENT_BLOCK_DIFFICULTY_CALL,
  GET_CURRENT_BLOCK_TIMESTAMP_CALL,
  MultiCallABI,
  parseDifficulty,
  parseTimestamp,
  useBlockMeta,
  useEtherBalance,
  useTokenBalance
} from '@usedapp/core'
import { DAppServiceBase, emptyChainCallResult, OnUpdate, ChainCallResult } from './dAppServiceBase'

export type BlockTimestamp = ReturnType<typeof useBlockMeta>['timestamp']
export type BlockDifficulty = ReturnType<typeof useBlockMeta>['difficulty']
export type EtherBalance = ReturnType<typeof useEtherBalance>
export type TokenBalance = ReturnType<typeof useTokenBalance>

export class DAppService extends DAppServiceBase {
  useBlockTimestamp(onUpdate?: OnUpdate<BlockTimestamp>): ChainCallResult<BlockTimestamp> {
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

  useBlockDifficulty(onUpdate?: OnUpdate<BlockDifficulty>): ChainCallResult<BlockDifficulty> {
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

  useEtherBalance(address: string, onUpdate?: OnUpdate<EtherBalance>): ChainCallResult<EtherBalance> {
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
  ): ChainCallResult<TokenBalance> {
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
