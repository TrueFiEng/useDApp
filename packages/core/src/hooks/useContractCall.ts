import { Interface } from '@ethersproject/abi'
import { Falsy } from '../model/types'
import { useChainCall } from './useChainCalls'

export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

export function useContractCall(call: ContractCall | Falsy): any | undefined {
  const callData = call && call.args.every((arg) => arg !== undefined) && call.abi.encodeFunctionData(call.method, call.args)

  const result = useChainCall(call && callData && { address: call.address, data: callData })
  return call && result !== undefined ? call.abi.decodeFunctionResult(call.method, result) : undefined
}
