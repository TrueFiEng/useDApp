import { createContext, useContext } from 'react'
import { Action, ChainState } from '..'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export interface SingleChainState {
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  multicallAddress: string | undefined
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export type MultiChainState = {
  [chainId in number]?: SingleChainState
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const MultiChainStatesContext = createContext<{
  chains: MultiChainState
  dispatchCalls: (action: Action) => void
}>({
  chains: {},
  dispatchCalls: () => undefined,
})

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useMultiChainStates() {
  return useContext(MultiChainStatesContext)
}
