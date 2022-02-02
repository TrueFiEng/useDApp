import { ChainId } from '../constants'
import { useContext } from 'react'
import { ChainStateContext, MultiChainStatesContext } from '../providers'

export function useChainState(chainId?: ChainId) {
  const chainState = useContext(ChainStateContext)
  const multiChainState = useContext(MultiChainStatesContext)

  if (chainId) {
    return {
      ...multiChainState.chains[chainId],
      dispatchCalls: multiChainState.dispatchCalls,
    }
  }
  return chainState
}
