import { useEffect, useMemo } from 'react'
import { ChainCall } from '../providers'
import { Falsy } from '../model/types'
import { useChainState } from './useChainState'
import { ChainId } from '../constants'

export function useChainCalls(calls: (ChainCall | Falsy)[], chainId?: ChainId) {
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

export function useChainCall(call: ChainCall | Falsy, chainId?: ChainId) {
  return useChainCalls([call], chainId)[0]
}
