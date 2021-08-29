import { createContext, useContext } from 'react'
import { Action } from './callsReducer'
import { ChainState } from './model'

export const ChainStateContext = createContext<{
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  multicallAddress: string | undefined
  dispatchCalls: (action: Action) => void
}>({
  multicallAddress: '',
  dispatchCalls: () => {
    // empty
  },
})

export function useChainState() {
  return useContext(ChainStateContext)
}
