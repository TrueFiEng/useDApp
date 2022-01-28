import { ReactNode, useEffect, useMemo, useState } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useConfig } from '../../config'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'

interface NetworkProviderProps {
  children: ReactNode
}

export function ReadonlyNetworksProvider({ children }: NetworkProviderProps) {
  const { readOnlyUrls, networks } = useConfig()
  const [providers, setProviders] = useState<Providers>({})

  const readonlyChains = useMemo(() => {
    if (!networks || !readOnlyUrls) {
      return []
    }
    return networks
      .filter(({ chainId }) => readOnlyUrls[chainId])
      .map(({ chainId }) => ({
        chainId,
        url: readOnlyUrls[chainId],
      }))
  }, [readOnlyUrls, networks])

  useEffect(() => {
    setProviders(
      Object.fromEntries(readonlyChains.map(({ chainId, url }) => [chainId, new JsonRpcProvider(url)])) as Providers
    )
  }, [readonlyChains])

  return <ReadonlyNetworksContext.Provider value={providers}>{children}</ReadonlyNetworksContext.Provider>
}
