import { useEffect, useMemo } from 'react'
import { RawCallResult, useChainState } from '../providers'
import { RawCall } from '../providers'
import { Falsy } from '../model/types'

export function useRawCalls(calls: (RawCall | Falsy)[]): RawCallResult[] {
  const { dispatchCalls, value } = useChainState()

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as RawCall[]
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

export function useRawCall(call: RawCall | Falsy) {
  return useRawCalls([call])[0]
}
