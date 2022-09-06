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

  const { readOnlyChainId } = useConfig()
  const [chainId, setChainId] = useState<number | undefined>()

  useEffect(() => {
    setChainId(connector?.chainId)

    if (!connector) {
      return
    }

    return connector.updated.on(({ chainId }) => {
      setChainId(chainId)
    })
  }, [connector])
  return opts?.queryParams?.chainId ?? chainId ?? readOnlyChainId
}
