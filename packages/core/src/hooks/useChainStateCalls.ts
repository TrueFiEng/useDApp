import { useContext, useEffect, useMemo } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { Falsy } from '../model/types'
import { ChainState2Context } from '..'

interface Result {
  results: ({ value: string | undefined; success: boolean } | undefined)[]
  error?: any
}

export function useChainStateCalls(calls: (ChainCall | Falsy)[]): Result {
  const { dispatchCalls, value } = useContext(ChainState2Context)

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  }, [JSON.stringify(calls), dispatchCalls])

  return {
    results: useMemo(
      () =>
        calls.map((call) => {
          if (call && value) {
            return value.state?.[call.address]?.[call.data]
          }
        }),
      [JSON.stringify(calls), value]
    ),
    error: value?.error,
  }
}

export function useChainStateCall(call: ChainCall | Falsy) {
  const { results, error } = useChainStateCalls([call])
  return { result: results[0], error }
}
