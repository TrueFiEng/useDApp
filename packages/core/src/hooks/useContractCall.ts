import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { Falsy } from '../model/types'
import { useChainCalls } from './useChainCalls'
import { RawCall } from '../providers'
import { ChainId } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
  )
}

function encodeCallData(call: ContractCall | Falsy, chainId?: ChainId): RawCall | Falsy {
  if (!call) {
    return undefined
  }
  if (!call.address || !call.method) {
    warnOnInvalidContractCall(call)
    return undefined
  }
  try {
    return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args), chainId }
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

export function useContractCall(call: ContractCall | Falsy, queryParams: QueryParams = {}): any[] | undefined {
  return useContractCalls([call], queryParams)[0]
}

export function useContractCalls(
  calls: (ContractCall | Falsy)[],
  queryParams: QueryParams = {}
): (any[] | undefined)[] {
  const results = useChainCalls(
    calls.map((call) => encodeCallData(call, queryParams.chainId)),
  )

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
