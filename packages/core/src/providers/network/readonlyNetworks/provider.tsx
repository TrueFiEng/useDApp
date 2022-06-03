import { ReactNode, useEffect, useState } from 'react'
import { providers } from 'ethers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'

const JsonRpcProvider = providers.JsonRpcProvider
type BaseProvider = providers.BaseProvider
const Provider = providers.Provider

interface NetworkProviderProps {
  providerOverrides?: Providers
  children?: ReactNode
}

const getProviderFromConfig = (urlOrProviderOrProviderFunction: string | BaseProvider | BaseProviderFactory) => {
  if (Provider.isProvider(urlOrProviderOrProviderFunction)) {
    return urlOrProviderOrProviderFunction
  }
  if (typeof urlOrProviderOrProviderFunction === 'function') {
    return urlOrProviderOrProviderFunction()
  }
  return new JsonRpcProvider(urlOrProviderOrProviderFunction)
}

export const getProvidersFromConfig = (readOnlyUrls: NodeUrls) =>
  fromEntries(
    Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => [
      chainId,
      getProviderFromConfig(urlOrProviderOrProviderFunction),
    ])
  )

export function ReadonlyNetworksProvider({ providerOverrides = {}, children }: NetworkProviderProps) {
  const { readOnlyUrls = {} } = useConfig()
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides })
  }, Object.entries(readOnlyUrls).flat())

  return <ReadonlyNetworksContext.Provider value={providers}>{children}</ReadonlyNetworksContext.Provider>
}
