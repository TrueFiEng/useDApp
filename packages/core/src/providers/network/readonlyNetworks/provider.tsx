import { ReactNode, useEffect, useState } from 'react'
import { JsonRpcProvider, Provider } from '@ethersproject/providers'
import { useConfig } from '../../config'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'

interface NetworkProviderProps {
  providerOverrides?: Providers
  children?: ReactNode
}

const extractFunctionOrString = (urlOrProviderFunction: string | BaseProviderFactory) => {
  if (typeof urlOrProviderFunction === 'function') {
    return urlOrProviderFunction()
  }
  return new JsonRpcProvider(urlOrProviderFunction)
}

export const getProvidersFromConfig = (readOnlyUrls: NodeUrls) =>
  fromEntries(
    Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => {
      const rpcProvider = Provider.isProvider(urlOrProviderOrProviderFunction)
        ? urlOrProviderOrProviderFunction
        : extractFunctionOrString(urlOrProviderOrProviderFunction)
      return [chainId, rpcProvider]
    })
  )

export function ReadonlyNetworksProvider({ providerOverrides = {}, children }: NetworkProviderProps) {
  const { readOnlyUrls = {} } = useConfig()
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides })
  }, [JSON.stringify(readOnlyUrls)])

  return <ReadonlyNetworksContext.Provider value={providers}>{children}</ReadonlyNetworksContext.Provider>
}
