import { QueryParams } from '../constants/type/QueryParams'
import { useConnector } from '../providers/network/connectors'
import { useConfig } from '../hooks'

export interface UseChainIdOptions {
  queryParams?: QueryParams
}

/**
 * Internal hook for reading current chainId for calls.
 * @internal Intended for internal use - use it on your own risk
 */
export function useChainId(opts: UseChainIdOptions = {}) {
  const { chainId } = useConnector()
  const { readOnlyChainId } = useConfig()

  return opts?.queryParams?.chainId ?? chainId ?? readOnlyChainId
}
