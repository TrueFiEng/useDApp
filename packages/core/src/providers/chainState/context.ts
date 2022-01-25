import { createContext, useContext } from 'react'
import { ChainStateWithError } from '.'
import { useConfig } from '..'
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

export const ChainState2Context = createContext<{
  value?: {
    blockNumber: number
    state?: ChainStateWithError
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

// export function useChainState() {
//   const { multicallVersion } = useConfig()
//   return multicallVersion === 1 ? useContext(ChainStateContext) : useContext(ChainState2Context)
// }
