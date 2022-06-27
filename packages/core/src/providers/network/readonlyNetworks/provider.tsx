import { ReactNode, useEffect, useState, useContext } from 'react'
import { JsonRpcProvider, Provider, BaseProvider } from '@ethersproject/providers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'
import { ConnectorContext } from '../connector/context';

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
  const activeConnector = useContext(ConnectorContext)?.activeConnector
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))

  const walletProvider = activeConnector?.getProvider()
  const chainId = activeConnector?.chainId
  const walletProviderItem = activeConnector && chainId ? {[chainId]: walletProvider} : {}

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides, ...walletProviderItem})
  }, [...Object.entries(readOnlyUrls).flat(), walletProvider])

  return <ReadonlyNetworksContext.Provider value={providers}>{children}</ReadonlyNetworksContext.Provider>
}
