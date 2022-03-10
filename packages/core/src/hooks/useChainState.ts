import { useContext } from 'react'
import { QueryParams } from '../constants/type/QueryParams'
import { Action, MultiChainStatesContext, SingleChainState, useNetwork } from '../providers'

export function useChainState(
  queryParams: QueryParams = {}
): (Partial<SingleChainState> & { dispatchCalls: (action: Action) => void }) | undefined {
  const multiChainState = useContext(MultiChainStatesContext)

  const { network } = useNetwork()
  const chainId = queryParams.chainId ?? network.chainId

  if (chainId === undefined) {
    return undefined
  }

  return {
    ...multiChainState.chains[chainId],
    dispatchCalls: multiChainState.dispatchCalls,
  }
}
