import { useContext, useEffect } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { ChainStateContext } from '../providers/chainState/context'
import { Falsy } from '../model/types'

export function useChainCalls(calls: (ChainCall | Falsy)[]) {
  const { addCalls, removeCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    const filteredCalls = calls.filter(Boolean) as ChainCall[]
    addCalls(filteredCalls)
    return () => removeCalls(filteredCalls)
  }, [JSON.stringify(calls), addCalls, removeCalls])

  return calls.map((call) => call && value?.state?.[call.address]?.[call.data])
}

export function useChainCall(call: ChainCall | Falsy) {
  return useChainCalls([call])[0]
}
