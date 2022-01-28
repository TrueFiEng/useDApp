import { ChainId } from '../constants'
import { useChainState } from './useChainState'

export function useMulticallAddress(chainId?: ChainId): string | undefined {
  return useChainState(chainId).multicallAddress
}
