import { createContext, useContext } from 'react'
import { Action, ChainState } from '..'

export interface SingleChainState {
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  multicallAddress: string | undefined
}

export type MultiChainState = {
  [chainId in number]?: SingleChainState
}

export const MultiChainStatesContext = createContext<{
  chains: MultiChainState
  dispatchCalls: (action: Action) => void
}>({
  chains: {},
  dispatchCalls: () => undefined,
})

export function useMultiChainStates() {
  return useContext(MultiChainStatesContext)
}
