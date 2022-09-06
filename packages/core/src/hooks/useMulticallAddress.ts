import { useContext } from 'react'
import { QueryParams } from '../constants/type/QueryParams'
import { MultiChainStatesContext } from '../providers/chainState/multiChainStates/context'
import { useChainState } from './useChainState'

/**
 * Returns an address of the multicall contract used on a given chain.
 * @public
 * @param queryParams see {@link QueryParams}.
 */
export function useMulticallAddress(queryParams: QueryParams = {}): string | undefined {
  const multiChainState = useContext(MultiChainStatesContext)
  console.log('useMulticallAddress', JSON.stringify({ queryParams: JSON.stringify(queryParams), chainState: JSON.stringify(useChainState(queryParams)), multiChainState: JSON.stringify(multiChainState) }))
  return useChainState(queryParams)?.multicallAddress
}
