import { useContext, useEffect } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { ChainStateContext } from '../providers/chainState/context'
import { Falsy } from '../model/types'

export function useChainCalls(calls: (ChainCall | Falsy)[]) {
  const { addCalls, removeCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    const filteredCalls = calls.filter((call) => call) as ChainCall[]
    addCalls(filteredCalls)
    return () => removeCalls(filteredCalls)
  }, [JSON.stringify(calls), addCalls, removeCalls])

  return calls.map((call) => {
    return call && value?.state?.[call.address]?.[call.data]
  })
}

export function useChainCall(call: ChainCall | Falsy) {
  const [result] = useChainCalls([call])
  return result
}
