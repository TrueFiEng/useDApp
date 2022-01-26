import { createContext } from 'react'
import { Action } from './callsReducer'
import { ChainState, Multicall1ChainState, Multicall2ChainState } from './model'

export function getChainStateContext<T extends ChainState>() {
  return createContext<{
    value?: {
      blockNumber: number
      state?: T
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
}

export const Multicall1ChainStateContext = getChainStateContext<Multicall1ChainState>()
export const Multicall2ChainStateContext = getChainStateContext<Multicall2ChainState>()
