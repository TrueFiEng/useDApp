import { createContext, useContext } from 'react'
import { Action } from './callsReducer'
import { ChainId } from '../../../constants'
import { ChainState } from '../../chainState'

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
