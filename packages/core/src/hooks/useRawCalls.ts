import { useContext, useEffect, useMemo } from 'react'
import { MultiChainStatesContext, RawCallResult } from '../providers'
import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { MultiChainState } from '../providers/chainState/multiChainStates/context'
import { useUpdateNetworksState } from '../providers/network/readonlyNetworks/context'

/**
 * A low-level function that makes multiple calls to specific methods of specific contracts and returns values or error if present.
 * The hook will cause the component to refresh when values change.
 *
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * It is recommended to use {@link useCalls} where applicable instead of this method.
 * @public
 * @param calls List of calls, also see {@link RawCall}. Calls need to be in the same order across component renders.
 * @returns list of multicall calls. See {@link RawCallResult} and {@link useRawCall}.
 */
export function useRawCalls(calls: (RawCall | Falsy)[]): RawCallResult[] {
  const { dispatchCalls, chains } = useContext(MultiChainStatesContext)
  const updateNetworkState = useUpdateNetworksState()

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as RawCall[]
    const nonStaticCalls: Record<number, number> = {}
    for (const call of filteredCalls) {
      if (!call.refreshPerBlocks && !call.isStatic) {
        nonStaticCalls[call.chainId] = (nonStaticCalls[call.chainId] || 0) + 1
      }
    }
    updateNetworkState({
      type: 'UPDATE_NON_STATIC_CALLS_COUNT',
      count: nonStaticCalls,
    })
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  }, [JSON.stringify(calls), dispatchCalls])

  return useMemo(
    () =>
      calls.map((call) => {
        return call ? extractCallResult(chains, call) : undefined
      }),
    [JSON.stringify(calls), chains]
  )
}

/**
 * A low-level function that makes a call to a specific method of a specific contract and returns the value or error if present.
 * The hook will cause the component to refresh whenever a new block is mined and the value is changed.
 *
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * It is recommended to use {@link useCall} where applicable instead of this method.
 *
 * @param call a single call, also see {@link RawCall}.
 *             A call can be Falsy, as it is important to keep the same ordering of hooks even if in a given render cycle
 *             and there might be not enough information to perform a call.
 * @public
 * @returns result of multicall call.
 *   The hook returns {@link RawCallResult} type.
 *   That is: `undefined` when call didn't return yet or object `{ success: boolean, value: string }` if it did,
 *   `success` - boolean indicating whether call was successful or not,
 *   `value` - encoded result when success is `true` or encoded error message when success is `false`.
 */
export function useRawCall(call: RawCall | Falsy) {
  return useRawCalls([call])[0]
}

function extractCallResult(chains: MultiChainState, call: RawCall): RawCallResult {
  const chainId = call.chainId
  return chainId !== undefined ? chains[chainId]?.value?.state?.[call.address.toLowerCase()]?.[call.data] : undefined
}
