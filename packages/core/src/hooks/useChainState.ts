import { useContext } from 'react'
import { ChainId } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { MultiChainStatesContext } from '../providers'

export function useChainState(queryParams: QueryParams = {}) {
  const multiChainState = useContext(MultiChainStatesContext)

  const chainId = queryParams.chainId ?? ChainId.Mainnet

  return {
    ...multiChainState.chains[chainId],
    dispatchCalls: multiChainState.dispatchCalls,
  }
  
}
