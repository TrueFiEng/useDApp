import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainStateCalls } from './useChainStateCalls'
import { ChainCall } from '../providers/chainState/callsReducer'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'

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
  result: { value: any[]; success: boolean } | undefined
  error?: any
}

export function useCall(call: Call | Falsy): CallResult {
  const { results, error } = useCalls([call])
  return { result: results[0], error }
}

type Error = [string]

export interface CallResults {
  results: ({ value: any[] | Error; success: boolean } | undefined)[]
  error?: any
}

export function useCalls(calls: (Call | Falsy)[]): CallResults {
  const { results, error } = useChainStateCalls(calls.map(encodeCallData))

  return {
    results: useMemo(
      () =>
        results.map((result, idx) => {
          const call = calls[idx]
          if (!result || !call) {
            return undefined
          }
          const { value, success } = result
          if (value === '0x' || value === undefined) {
            warnOnInvalidCall(call)
            return undefined
          }
          if (success) {
            return {
              success,
              value: call.contract.interface.decodeFunctionResult(call.method, value) as any[],
            }
          } else {
            return {
              success,
              value: utils.defaultAbiCoder.decode(['string'], value) as Error, // decode error message
            }
          }
        }),
      [results]
    ),
    error,
  }
}
