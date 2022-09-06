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
  const [chainId, setChainId] = useState<number | undefined>(opts?.queryParams?.chainId ?? readOnlyChainId)

  useEffect(() => {
    if (!connector) {
      return
    }

    setChainId(connector.chainId)
    return connector.updated.on(({ chainId }) => {
      setChainId(opts?.queryParams?.chainId ?? chainId ?? readOnlyChainId)
    })
  }, [connector])
  return chainId
}
