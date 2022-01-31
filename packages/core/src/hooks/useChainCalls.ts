import { useEffect, useMemo } from 'react'
import { ChainCall, MulticallResult, useChainState } from '../providers'
import { Falsy } from '../model/types'

export function useFailableChainCalls(calls: (ChainCall | Falsy)[]): MulticallResult[] {
  const { dispatchCalls, value } = useChainState()

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  }, [JSON.stringify(calls), dispatchCalls])

  return useMemo(
    () =>
      calls.map((call) => {
        if (call && value) {
          return value.state?.[call.address]?.[call.data]
        }
      }),
    [JSON.stringify(calls), value]
  )
}

export function useChainCalls(calls: (ChainCall | Falsy)[]) {
  const results = useFailableChainCalls(calls)
  return results.map((result) => result?.value)
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}
