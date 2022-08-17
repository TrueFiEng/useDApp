import { QueryParams } from '../constants/type/QueryParams'
import { useChainState } from './useChainState'

/**
 * Returns an address of the multicall contract used on a given chain.
 * @public
 * @param queryParams see {@link QueryParams}.
 */
export function useMulticallAddress(queryParams: QueryParams = {}): string | undefined {
  return useChainState(queryParams)?.multicallAddress
}
