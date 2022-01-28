import { useEffect, useMemo } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { Falsy } from '../model/types'
import { useChainState } from './useChainState'
import { ChainId } from '../constants'

export function useChainCalls(calls: (ChainCall | Falsy)[], chainId?: ChainId): ChainCall[] {
  const { dispatchCalls, value } = useChainState(chainId)

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[]
    dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls })
    return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls })
  }, [JSON.stringify(calls), dispatchCalls])

  return useMemo(() => calls.map((call) => call && value?.state?.[call.address]?.[call.data]), [
    JSON.stringify(calls),
    value,
  ])
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}
