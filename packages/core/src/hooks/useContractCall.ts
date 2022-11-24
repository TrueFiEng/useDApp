import { utils } from 'ethers'
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
 * Represents a single call to a contract that can be included in multicall.
 *
 * @public
 * @deprecated Use {@link useCall} instead.
 */
export interface ContractCall {
  /**
   * ABI of a contract, see [Interface](https://docs.ethers.io/v5/api/utils/abi/interface/)
   */
  abi: utils.Interface
  /**
   * address of a contract to call
   */
  address: string
  /**
   * function name
   */
  method: string
  /**
   * arguments for the function
   */
  args: any[]
}

/**
 * Makes a call to a specific contract and returns the value. The hook will cause the component to refresh when a new block is mined and the return value changes.
 * A syntax sugar for {@link useChainCall} that uses ABI, function name, and arguments instead of raw data.
 * @public
 * @param call a single call to a contract, also see {@link ContractCall}.
 * @deprecated It is recommended to use {@link useCall} instead of this method as it is deprecated.
 * @returns the result of a call or undefined if call didn't return yet.
 */
export function useContractCall(call: ContractCall | Falsy, queryParams: QueryParams = {}): any[] | undefined {
  return useContractCalls([call], queryParams)[0]
}

/**
 * Makes calls to specific contracts and returns values. The hook will cause the component to refresh when a new block is mined and the return values change.
 * A syntax sugar for {@link useChainCalls} that uses ABI, function name, and arguments instead of raw data.
 * @public
 * @param calls a list of contract calls , also see {@link ContractCall}.
 * @deprecated It is recommended to use {@link useCalls} instead of this method as it is deprecated.
 * @returns array of results. Undefined if call didn't return yet.
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
        calls.map((call) => call && { address: call.address?.toLowerCase(), method: call.method, args: call.args })
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
