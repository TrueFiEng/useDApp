import { useMemo } from 'react'
import { utils, Contract } from 'ethers'
import { Falsy } from '../model/types'
import { useFailableChainCalls } from './useChainCalls'
import { encodeCallData, warnOnInvalidCall } from '../helpers'

export interface Call {
  contract: Contract
  method: string
  args: any[]
}

type ErrorMessage = string
type CallResult = { value: any[] | undefined; error: ErrorMessage | undefined } | undefined

export function useCall(call: Call | Falsy): CallResult {
  return useCalls([call])[0]
}

export function useCalls(calls: (Call | Falsy)[]): CallResult[] {
  const results = useFailableChainCalls(calls.map(encodeCallData))
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
            error: new utils.Interface(['function Error(string)']).decodeFunctionData(
              'Error',
              value
            )[0] as ErrorMessage, // decode error message,
          }
        }
      }),
    [results]
  )
}
