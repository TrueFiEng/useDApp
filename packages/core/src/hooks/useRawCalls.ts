import { useContext, useEffect, useMemo } from 'react'
import { MultiChainStatesContext, RawCallResult } from '../providers'
import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { MultiChainState } from '../providers/chainState/multiChainStates/context'

/**
 * A low-level function that makes multiple calls to specific methods of specific contracts and returns values or error if present.
 * The hook will cause the component to refresh when values change.
 *
 * Calls will be combined into a single multicall across all uses of useChainCall, useChainCalls, useRawCall and useRawCalls.
 * It is recommended to use useCalls where applicable instead of this method.
 * @param calls List of calls, also see {@link ChainCall}. Calls need to be in the same order across component renders.
 * @returns
 */
export function useRawCalls(calls: (RawCall | Falsy)[]): RawCallResult[] {
  const { dispatchCalls, chains } = useContext(MultiChainStatesContext)

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as RawCall[]
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
 * Calls will be combined into a single multicall across all uses of useChainCall, useChainCalls, useRawCall and useRawCalls.
 * It is recommended to use useCall where applicable instead of this method.
 *
 * @param call a single call, also see {@link RawCall}.
 *             A call can be Falsy, as it is important to keep the same ordering of hooks even if in a given render cycle
 *             and there might be not enough information to perform a call.
 * @returns result of multicall call.
 */
export function useRawCall(call: RawCall | Falsy) {
  return useRawCalls([call])[0]
}

function extractCallResult(chains: MultiChainState, call: RawCall): RawCallResult {
  const chainId = call.chainId
  return chainId !== undefined ? chains[chainId]?.value?.state?.[call.address]?.[call.data] : undefined
}
