import { QueryParams } from '../constants/type/QueryParams'
import { useConnector } from '../providers/network/connectors'
import { useConfig } from '../hooks'
import { useEffect, useState } from 'react'

export interface UseChainIdOptions {
  queryParams?: QueryParams
}

/**
 * Internal hook for reading current chainId for calls.
 * @internal Intended for internal use - use it on your own risk
 */
export function useChainId(opts: UseChainIdOptions = {}) {
  const { connector } = useConnector()
  const [chainId, setChainId] = useState<number>()

  useEffect(() => {
    if (!connector) {
      return
    }

    return connector.updated.on(({ chainId }) => {
      setChainId(opts?.queryParams?.chainId ?? chainId ?? readOnlyChainId)
    })
  }, [connector])

  const { readOnlyChainId } = useConfig()
  return opts?.queryParams?.chainId ?? chainId ?? readOnlyChainId
}
