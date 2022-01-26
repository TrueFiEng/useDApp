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

type ErrorMessage = string

export type CallResult = { value: any[] | undefined; error: ErrorMessage | undefined } | undefined

export function useCall(call: Call | Falsy): CallResult {
  return useCalls([call])[0]
}

export function useCalls(calls: (Call | Falsy)[]): CallResult[] {
  const results = useChainStateCalls(calls.map(encodeCallData))
  return useMemo(
    () =>
      results.map((result, idx) => {
        const call = calls[idx]
        if (!result || !call) {
          return undefined
        }
        const { value, success } = result
        if (value === undefined || value === '0x') {
          warnOnInvalidCall(call)
          return undefined
        }
        if (success) {
          return {
            value: call.contract.interface.decodeFunctionResult(call.method, value) as any[],
            error: undefined,
          }
        } else {
          return {
            value: undefined,
            error: new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0] as string, // decode error message,
          }
        }
      }),
    [results]
  )
}
