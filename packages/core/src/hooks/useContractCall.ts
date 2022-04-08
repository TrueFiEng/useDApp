import { Interface } from '@ethersproject/abi'
import { useMemo } from 'react'
import { ChainId } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { Falsy } from '../model/types'
import { RawCall } from '../providers'
import { useChainCalls } from './useChainCalls'
import { useChainId } from './useChainId'

function warnOnInvalidContractCall(call: ContractCall | Falsy) {
  console.warn(
    `Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`
  )
}

function encodeCallData(call: ContractCall | Falsy, chainId: ChainId): RawCall | Falsy {
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

/**
 * @public
 * @deprecated Use {@link useCall} instead.
 */
export interface ContractCall {
  abi: Interface
  address: string
  method: string
  args: any[]
}

/**
 * @public
 * @deprecated Use {@link useCalls} instead.
 */
export function useContractCall(call: ContractCall | Falsy, queryParams: QueryParams = {}): any[] | undefined {
  return useContractCalls([call], queryParams)[0]
}

/**
 * @public
 * @deprecated Use {@link useCall} instead.
 */
export function useContractCalls(
  calls: (ContractCall | Falsy)[],
  queryParams: QueryParams = {}
): (any[] | undefined)[] {
  const chainId = useChainId({ queryParams })

  const rawCalls = useMemo(
    () => calls.map((call) => (chainId !== undefined ? encodeCallData(call, chainId) : undefined)),
    [
      JSON.stringify(
        calls.map((call) => call && { address: call.address.toLowerCase(), method: call.method, args: call.args })
      ),
      chainId,
    ]
  )

  const results = useChainCalls(rawCalls)

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
    [JSON.stringify(results)]
  )
}
