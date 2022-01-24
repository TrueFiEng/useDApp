import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCallsWithError } from './useChainCalls'
import { ChainCall } from '../providers/chainState/callsReducer'
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/abi'

function warnOnInvalidCall(call: Call | Falsy) {
  if (!call) {
    return
  }
  const { contract, method, args } = call
  console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`)
}

function encodeCallData(call: Call | Falsy): ChainCall | Falsy {
  if (!call) {
    return undefined
  }
  const { contract, method, args } = call
  if (!contract.address || !method) {
    warnOnInvalidCall(call)
    return undefined
  }
  try {
    return { address: contract.address, data: contract.interface.encodeFunctionData(method, args) }
  } catch {
    warnOnInvalidCall(call)
    return undefined
  }
}

export interface Call {
  contract: Contract
  method: string
  args: any[]
}

export interface CallResult {
  result: any[] | undefined
  error?: any
}

export function useCall(call: Call | Falsy): CallResult {
  const { results, error } = useCalls([call])
  return { result: results[0], error }
}

export interface CallResults {
  results: (any[] | undefined)[]
  error?: any
}

export function useCalls(calls: (Call | Falsy)[]): CallResults {
  const { results, error } = useChainCallsWithError(calls.map(encodeCallData))

  return {
    results: useMemo(
      () =>
        results.map((result, idx) => {
          const call = calls[idx]
          if (result === '0x') {
            warnOnInvalidCall(call)
            return undefined
          }
          return call && result
            ? (call.contract.interface.decodeFunctionResult(call.method, result) as any[])
            : undefined
        }),
      [results]
    ),
    error,
  }
}
