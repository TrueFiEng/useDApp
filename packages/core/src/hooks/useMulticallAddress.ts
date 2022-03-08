import { useChainState } from './useChainState'
import { QueryParams } from './useContractCall'

export function useMulticallAddress(queryParams: QueryParams): string | undefined {
  return useChainState(queryParams).multicallAddress
}
