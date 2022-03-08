import { useContext } from 'react'
import { QueryParams } from '../constants/type/Options'
import { ChainStateContext, MultiChainStatesContext } from '../providers'

export function useChainState(queryParams: QueryParams) {
  const chainState = useContext(ChainStateContext)
  const multiChainState = useContext(MultiChainStatesContext)

  if (queryParams.chainId) {
    return {
      ...multiChainState.chains[queryParams.chainId],
      dispatchCalls: multiChainState.dispatchCalls,
    }
  }
  return chainState
}
