import { useContext } from 'react'
import { ChainStateContext, MultiChainStatesContext } from '../providers'
import { QueryParams } from './useContractCall'

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
