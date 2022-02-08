import { useMemo } from 'react'
import { Contract } from 'ethers'
import { Falsy } from '../model/types'
import { useRawCalls } from './useRawCalls'
import { CallResult, decodeCallResult, encodeCallData } from '../helpers'
import { ChainId } from '../constants'

export interface Call {
  contract: Contract
  method: string
  args: any[]
}

export function useCall(call: Call | Falsy): CallResult {
  return useCalls([call])[0]
}

export function useCalls(calls: (Call | Falsy)[], chainId?: ChainId): CallResult[] {
  const results = useRawCalls(calls.map(encodeCallData), chainId)
  return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results])
}
