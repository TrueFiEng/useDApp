import { ReactNode, useEffect, useState } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useConfig } from '../../config'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { Chain, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'

interface NetworkProviderProps {
  children: ReactNode
}

export const getProvidersFromConfig = (networks: Chain[], readOnlyUrls: NodeUrls) =>
  fromEntries(
    networks
      .filter(({ chainId }) => readOnlyUrls[chainId])
      .map(({ chainId }) => [chainId, new JsonRpcProvider(readOnlyUrls[chainId])])
  )

export function ReadonlyNetworksProvider({ children }: NetworkProviderProps) {
  const { readOnlyUrls, networks } = useConfig()
  const [providers, setProviders] = useState<Providers>({})

  useEffect(() => {
    if (!networks || !readOnlyUrls) {
      setProviders({})
    } else {
      setProviders(getProvidersFromConfig(networks, readOnlyUrls))
    }
  }, [readOnlyUrls, networks])

  return <ReadonlyNetworksContext.Provider value={providers}>{children}</ReadonlyNetworksContext.Provider>
}
