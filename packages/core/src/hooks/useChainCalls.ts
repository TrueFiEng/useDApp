import { useContext, useEffect } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { ChainStateContext } from '../providers/chainState/context'

export function useChainCalls(calls: ChainCall[]) {
  const { addCalls, removeCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    addCalls(calls)
    return () => removeCalls(calls)
  }, [JSON.stringify(calls), addCalls, removeCalls])

  return calls.map(({ address, data }) => {
    return value?.state?.[address]?.[data]
  })
}

type Falsy = false | 0 | "" | null | undefined 
export function useChainCall(call: ChainCall | Falsy) {
  const [result] = useChainCalls(call ? [call] : [])
  return result
}
