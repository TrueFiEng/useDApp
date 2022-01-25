import { createContext } from 'react'
import { Multicall1ChainState, Multicall2ChainState } from './model'
import { Action } from './callsReducer'

export const ChainStateContext = createContext<{
  value?: {
    blockNumber: number
    state?: Multicall1ChainState
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

export const ChainState2Context = createContext<{
  value?: {
    blockNumber: number
    state?: Multicall2ChainState
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
