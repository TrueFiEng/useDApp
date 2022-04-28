import { QueryParams } from '../constants/type/QueryParams'
import { useConfig, useNetwork } from '../providers'

export interface UseChainIdOptions {
  queryParams?: QueryParams
}

/**
 * Internal hook for reading current chainId for calls.
 * @internal Intended for internal use - use it on your own risk
 */
export function useChainId(opts: UseChainIdOptions = {}) {
  const { network } = useNetwork()
  const { readOnlyChainId } = useConfig()
  return opts?.queryParams?.chainId ?? network.chainId ?? readOnlyChainId
}
