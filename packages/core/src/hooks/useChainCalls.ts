import { useContext, useEffect, useMemo } from 'react'
import { ChainCall, ChainStateContext, MulticallResult } from '../providers'
import { Falsy } from '../model/types'

export function useChainCalls(calls: (ChainCall | Falsy)[]): MulticallResult[] {
  const { dispatchCalls, value } = useContext(ChainStateContext)

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

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}
