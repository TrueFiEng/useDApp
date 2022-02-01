import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'
import { Action, ChainState } from '..'

export const MultiChainStatesContext = createContext<{
  chains: {
    [chainId in ChainId]?: {
      value?: {
        blockNumber: number
        state?: ChainState
        error?: unknown
      }
      multicallAddress: string | undefined
    }
  }
  dispatchCalls: (action: Action) => void
}>({
  chains: {},
  dispatchCalls: () => undefined,
})

export function useMultiChainStates() {
  return useContext(MultiChainStatesContext)
}
