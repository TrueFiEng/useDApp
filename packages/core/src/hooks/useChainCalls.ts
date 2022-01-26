import { useContext, useEffect, useMemo } from 'react'
import {
  ChainCall,
  ChainState,
  getChainStateContext,
  Multicall1ChainState,
  Multicall1Result,
  Multicall2ChainState,
  Multicall2Result,
} from '../providers'
import { Falsy } from '../model/types'

function useChainCallsRaw<T extends ChainState>(calls: (ChainCall | Falsy)[]): any[] {
  const { dispatchCalls, value } = useContext(getChainStateContext<T>())

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

export function useChainCalls(calls: (ChainCall | Falsy)[]): Multicall1Result[] {
  return useChainCallsRaw<Multicall1ChainState>(calls)
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}

export function useChainStateCalls(calls: (ChainCall | Falsy)[]): Multicall2Result[] {
  return useChainCallsRaw<Multicall2ChainState>(calls)
}

export function useChainStateCall(call: ChainCall | Falsy) {
  return useChainStateCalls([call])[0]
}
