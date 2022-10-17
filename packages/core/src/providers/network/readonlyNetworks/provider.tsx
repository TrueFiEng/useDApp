import { ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { providers } from 'ethers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, ChainId, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'
import { networkStatesReducer } from './reducer'
import { useWindow } from '../../window'
import { isWebSocketProvider } from '../../../helpers'

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
  const isActive = useWindow()
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))
  const [networkStates, dispatchNetworkState] = useReducer(networkStatesReducer, {
    ...fromEntries(Object.keys({ ...readOnlyUrls, ...providerOverrides }).map((chainId) => [chainId, { errors: [] }])),
  })
  const getPollingInterval = useCallback((chainId: number) => pollingIntervals?.[chainId] ?? pollingInterval, [
    pollingInterval,
    pollingIntervals,
  ])

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides })
  }, Object.entries(readOnlyUrls).flat())

  useEffect(() => {
    for (const [chainId] of Object.entries(readOnlyUrls)) {
      const provider = providers[(chainId as unknown) as ChainId]
      if (provider && !isWebSocketProvider(provider)) {
        provider.polling = isActive
      }
    }
  }, [isActive, providers, readOnlyUrls])

  useEffect(() => {
    for (const [chainId, provider] of Object.entries(providers)) {
      if (!isWebSocketProvider(provider)) {
        provider.pollingInterval = getPollingInterval(Number(chainId))
      }
    }
  }, [providers, getPollingInterval])

  const networks = useMemo(
    () => ({
      providers,
      updateNetworkState: dispatchNetworkState,
      networkStates,
    }),
    [providers, dispatchNetworkState, networkStates]
  )

  return <ReadonlyNetworksContext.Provider value={networks}>{children}</ReadonlyNetworksContext.Provider>
}
