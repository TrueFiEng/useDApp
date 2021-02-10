import { createContext, useContext } from 'react'
import { ChainCall } from './callsReducer'
import { ChainState } from './model'

export const ChainStateContext = createContext<{
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  multicallAddress: string
  addCalls(calls: ChainCall[]): void
  removeCalls(calls: ChainCall[]): void
}>({
  multicallAddress: '',
  addCalls: () => {
    // empty
  },
  removeCalls: () => {
    // empty
  },
})

export function useChainState() {
  return useContext(ChainStateContext)
}
