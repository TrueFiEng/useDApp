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
  if (!call) {
    return undefined
  }
  if (!call.address || !call.method) {
    warnOnInvalidContractCall(call)
    return undefined
  }
  try {
    return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args) }
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

export interface ContractCallResult {
  result: any[] | undefined
  error?: any
}

export function useContractCall(call: ContractCall | Falsy): ContractCallResult {
  const { results, error } = useContractCalls([call])
  return { result: results[0], error }
}

export interface ContractCallResults {
  results: (any[] | undefined)[]
  error?: any
}

export function useContractCalls(calls: (ContractCall | Falsy)[]): ContractCallResults {
  const { results, error } = useChainCalls(calls.map(encodeCallData))

  return {
    results: useMemo(
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
    ),
    error,
  }
}
