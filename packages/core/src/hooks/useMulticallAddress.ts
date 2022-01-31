import { useChainState } from '../providers'

export function useMulticallAddress(): string | undefined {
  return useChainState().multicallAddress
}
