import { ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { providers } from 'ethers'
import { useConfig } from '../../../hooks'
import { Providers } from './model'
import { ReadonlyNetworksContext } from './context'
import { BaseProviderFactory, ChainId, NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'
import { ConnectorContext } from '../connector/context'
import { networkStatesReducer } from './reducer'
import { useWindow } from '../../window'
import { isWebSocketProvider } from '../../../helpers'

const { Provider, StaticJsonRpcProvider, JsonRpcProvider } = providers
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
  const activeConnector = useContext(ConnectorContext)?.activeConnector
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
  const getPollingInterval = useCallback((chainId: number) => pollingIntervals?.[chainId] ?? pollingInterval, [
    pollingInterval,
    pollingIntervals,
  ])

  const walletProvider = activeConnector?.getProvider()
  const chainId = activeConnector?.chainId
  const walletProviderItem = activeConnector && chainId ? { [chainId]: walletProvider } : {}

  useEffect(() => {
    setProviders({ ...getProvidersFromConfig(readOnlyUrls), ...providerOverrides, ...walletProviderItem })
  }, [...Object.entries(readOnlyUrls).flat(), walletProvider])

  useEffect(() => {
    for (const [chainId, { nonStaticCalls }] of Object.entries(networkStates)) {
      const provider = providers[(chainId as unknown) as ChainId]
      if (provider && !isWebSocketProvider(provider)) {
        provider.polling = provider instanceof JsonRpcProvider && isActive && nonStaticCalls > 0
      }
    }
  }, [networkStates, isActive])

  useEffect(() => {
    for (const [chainId, provider] of Object.entries(providers)) {
      if (provider instanceof JsonRpcProvider && !isWebSocketProvider(provider)) {
        provider.pollingInterval = getPollingInterval(Number(chainId))
      }
    }
  }, [providers, getPollingInterval])

  const networks = useMemo(
    () => ({
      providers,
      updateNetworkState: dispatchNetworkState,
    }),
    [providers, dispatchNetworkState]
  )

  return <ReadonlyNetworksContext.Provider value={networks}>{children}</ReadonlyNetworksContext.Provider>
}
