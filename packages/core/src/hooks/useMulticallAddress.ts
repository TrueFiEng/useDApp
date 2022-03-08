import { QueryParams } from '../constants/type/Options'
import { useChainState } from './useChainState'

export function useMulticallAddress(queryParams: QueryParams): string | undefined {
  return useChainState(queryParams).multicallAddress
}
