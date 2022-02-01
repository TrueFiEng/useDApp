import { ChainId } from '../constants'
import { useContext } from 'react'
import { ActiveChainStateContext, MultiChainStatesContext } from '../providers'

export function useChainState(chainId?: ChainId) {
  const chainState = useContext(ActiveChainStateContext)
  const multiChainState = useContext(MultiChainStatesContext)

  if (chainId) {
    return {
      ...multiChainState.chains[chainId],
      dispatchCalls: multiChainState.dispatchCalls,
    }
  }
  return chainState
}
