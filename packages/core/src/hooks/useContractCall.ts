import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCalls } from './useChainCalls'
import { ChainCall } from '../providers/chainState/callsReducer'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
  )
}

function encodeCallData(call: ContractCall | Falsy): ChainCall | Falsy {
  try {
    return call && { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args) }
  } catch {
    warnOnInvalidContractCall(call)
    return undefined
  }
}

export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

export function useContractCall(call: ContractCall | Falsy): any[] | undefined {
  return useContractCalls([call])[0]
}

export function useContractCalls(calls: (ContractCall | Falsy)[]): (any[] | undefined)[] {
  const results = useChainCalls(calls.map(encodeCallData))

  return useMemo(
    () =>
      results.map((result, idx) => {
        const call = calls[idx]
        if (result === '0x') {
          warnOnInvalidContractCall(call)
          return undefined
        }
        return call && result ? (call.abi.decodeFunctionResult(call.method, result) as any[]) : undefined
      }),
    [results]
  )
}
