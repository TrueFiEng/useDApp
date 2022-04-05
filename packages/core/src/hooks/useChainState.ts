import { useContext } from 'react'
import { QueryParams } from '../constants/type/QueryParams'
import { Action, MultiChainStatesContext, SingleChainState } from '../providers'
import { useChainId } from './useChainId'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useChainState(
  queryParams: QueryParams = {}
): (Partial<SingleChainState> & { dispatchCalls: (action: Action) => void }) | undefined {
  const multiChainState = useContext(MultiChainStatesContext)
  const chainId = useChainId({ queryParams })

  if (chainId === undefined) {
    return undefined
  }

  return {
    ...multiChainState.chains[chainId],
    dispatchCalls: multiChainState.dispatchCalls,
  }
}
