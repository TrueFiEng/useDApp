import { ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
import { AbstractProvider, JsonRpcProvider } from 'ethers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'
import { networkStatesReducer } from './reducer'

interface NetworkProviderProps {
  providerOverrides?: Providers
  children?: ReactNode
}

const getProviderFromConfig = (urlOrProviderOrProviderFunction: string | AbstractProvider | BaseProviderFactory) => {
  if (typeof urlOrProviderOrProviderFunction === 'string') {
    return new JsonRpcProvider(urlOrProviderOrProviderFunction)
  }
  if (typeof urlOrProviderOrProviderFunction === 'function') {
    return urlOrProviderOrProviderFunction()
  }
  return urlOrProviderOrProviderFunction
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
  // const isActive = useWindow()
  const [providers, setProviders] = useState<Providers>(() => ({
    ...getProvidersFromConfig(readOnlyUrls),
    ...providerOverrides,
  }))
  const [networkStates, dispatchNetworkState] = useReducer(networkStatesReducer, {
    ...fromEntries(Object.keys({ ...readOnlyUrls, ...providerOverrides }).map((chainId) => [chainId, { errors: [] }])),
  })
  // const getPollingInterval = useCallback((chainId: number) => pollingIntervals?.[chainId] ?? pollingInterval, [
  //   pollingInterval,
  //   pollingIntervals,
  // ])

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides })
  }, Object.entries(readOnlyUrls).flat())

  // useEffect(() => {
  //   for (const [chainId] of Object.entries(readOnlyUrls)) {
  //     const provider = providers[(chainId as unknown) as ChainId]
  //     if (provider && !isWebSocketProvider(provider)) {
  //       provider.polling = isActive
  //     }
  //   }
  // }, [isActive, providers, readOnlyUrls])

  // useEffect(() => {
  //   for (const [, provider] of Object.entries(providers)) {
  //     if (!isWebSocketProvider(provider)) {
  //       provider._pollingInterval = getPollingInterval(Number(chainId))
  //     }
  //   }
  // }, [providers, getPollingInterval])

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
