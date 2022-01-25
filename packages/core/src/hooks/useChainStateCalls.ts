import { useContext, useEffect, useMemo } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { Falsy } from '../model/types'
import { ChainState2Context } from '..'

type Result = { value: string | undefined; success: boolean } | undefined

export function useChainStateCalls(calls: (ChainCall | Falsy)[]): Result[] {
  const { dispatchCalls, value } = useContext(ChainState2Context)

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

export function useChainStateCall(call: ChainCall | Falsy) {
  return useChainStateCalls([call])[0]
}
