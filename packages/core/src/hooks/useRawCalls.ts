import { useContext, useEffect, useMemo } from 'react'
import { MultiChainStatesContext, RawCallResult } from '../providers'
import { RawCall } from '../providers'
import { Falsy } from '../model/types'
import { MultiChainState } from '../providers/chainState/multiChainStates/context'
import { useEthers } from './useEthers'

export function useRawCalls(calls: (RawCall | Falsy)[]): RawCallResult[] {
  const { dispatchCalls, chains } = useContext(MultiChainStatesContext)
  const { chainId } = useEthers()

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as RawCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  }, [JSON.stringify(calls), dispatchCalls])

  return useMemo(
    () =>
      calls.map((call) => {
        return call ? extractCallResult(chains, call, chainId) : undefined
      }),
    [JSON.stringify(calls), chains]
  )
}

export function useRawCall(call: RawCall | Falsy) {
  return useRawCalls([call])[0]
}

function extractCallResult(chains: MultiChainState, call: RawCall, defaultChainId: number | undefined): RawCallResult {
  const chainId = call.chainId ?? defaultChainId
  return chainId !== undefined ? chains[chainId]?.value?.state?.[call.address]?.[call.data] : undefined
}
