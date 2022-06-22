import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { providers } from 'ethers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, ChainId, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'
import { networkStatesReducer } from './reducer'
import { useWindow } from '../../window'

const { Provider, StaticJsonRpcProvider } = providers
type BaseProvider = providers.BaseProvider

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
  return new StaticJsonRpcProvider(urlOrProviderOrProviderFunction)
}

export const getProvidersFromConfig = (readOnlyUrls: NodeUrls) =>
  fromEntries(
    Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => [
      chainId,
      getProviderFromConfig(urlOrProviderOrProviderFunction),
    ])
  )

export function ReadonlyNetworksProvider({ providerOverrides = {}, children }: NetworkProviderProps) {
  const { readOnlyUrls = {}, pollingInterval, pollingIntervals } = useConfig()
  const { isActive } = useWindow()
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))
  const [networkStates, dispatchNetworkState] = useReducer(networkStatesReducer, {
    ...fromEntries(
      Object.keys({ ...readOnlyUrls, ...providerOverrides }).map((chainId) => [chainId, { nonStaticCalls: 0 }])
    ),
  })
  const getPollingInterval = useCallback((chainId: number) => pollingIntervals?.[chainId] ?? pollingInterval, [pollingInterval, pollingIntervals])

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides })
  }, Object.entries(readOnlyUrls).flat())

  useEffect(() => {
    for (const [chainId, { nonStaticCalls }] of Object.entries(networkStates)) {
      const provider = providers[(chainId as unknown) as ChainId]
      if (provider) {
        provider.polling = isActive && nonStaticCalls > 0
      }
    }
  }, [networkStates, isActive])

  useEffect(() => {
    for (const [chainId, provider] of Object.entries(providers)) {
      provider.pollingInterval = getPollingInterval(Number(chainId))
    }
  }, [providers, getPollingInterval])

  return (
    <ReadonlyNetworksContext.Provider
      value={{
        providers,
        updateNetworkState: dispatchNetworkState,
      }}
    >
      {children}
    </ReadonlyNetworksContext.Provider>
  )
}
