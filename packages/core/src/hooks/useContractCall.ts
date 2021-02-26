import { Interface } from '@ethersproject/abi'
import { Falsy } from '../model/types'
import { useChainCall } from './useChainCalls'

export function useContractCall(
  abi: Interface,
  address: string | Falsy,
  functionName: string,
  args: any[] | Falsy
): any | undefined {
  const callData = args && args.every((arg) => arg !== undefined) && abi.encodeFunctionData(functionName, args)
  const result = useChainCall(callData && address && { address, data: callData })
  if (result === '0x') {
    console.warn(`Invalid contract call: address=${address} function=${functionName} args=${args}`)
    return undefined
  }
  return result !== undefined ? abi.decodeFunctionResult(functionName, result) : undefined
}
