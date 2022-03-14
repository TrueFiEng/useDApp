import { QueryParams } from '../constants/type/QueryParams'
import { useChainState } from './useChainState'

/**
 * @public
 */
export function useMulticallAddress(queryParams: QueryParams = {}): string | undefined {
  return useChainState(queryParams)?.multicallAddress
}
