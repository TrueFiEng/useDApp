import { ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networkReducer } from './reducer'
import { providers } from 'ethers'
import { subscribeToProviderEvents } from '../../../helpers'
import { useLocalStorage, useConfig } from '../../../hooks'
import detectEthereumProvider from '@metamask/detect-provider'
import { ConnectorContext, MetamaskConnector } from '../connector'
import { DefaultWalletConnector } from '../connector/impls/defaultWallet'
import { ConnectorController } from '../connector/connectorController'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider

interface NetworkProviderProps {
  children: ReactNode
  providerOverride?: JsonRpcProvider
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function NetworkProvider({ children, providerOverride }: NetworkProviderProps) {
  const { autoConnect } = useConfig()

  const [network, dispatch] = useReducer(networkReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)
  const [autoConnectTag, setAutoConnectTag] = useLocalStorage('autoConnectTag')
  const [isLoading, setLoading] = useState(false)
  const { connectors, setSelectedConnector, selectedConnector, activeConnector, addConnector } = useContext(
    ConnectorContext
  )!

  const reportError = useCallback((error: Error) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }, [])

  const deactivate = useCallback(async () => {
    setAutoConnectTag(undefined)
    setLoading(true)
    await activeConnector?.deactivate()
    setSelectedConnector(undefined)
    setLoading(false)
  }, [activeConnector, connectors])

  useEffect(() => {
    if (providerOverride) {
      void activate(providerOverride)
    }
  }, [providerOverride, connectors])

  const activate = useCallback(
    async (provider: JsonRpcProvider | ExternalProvider | { tag: string }) => {
      // TODO add previous version compatibility

      const tag = 'tag' in provider ? provider.tag : undefined

      setLoading(true)

      const newConnector = !tag ? new DefaultWalletConnector(provider as JsonRpcProvider | ExternalProvider) : undefined

      const connector = tag
        ? connectors.find((c) => c.connector.getTag() === tag)
        : new ConnectorController(newConnector!)

      if (!connector) {
        setLoading(false)
        throw new Error('Connector not defined')
      }

      if (!connector.active) {
        await connector.activate()
      }

      onUnsubscribe()
      const clearSubscriptions = subscribeToProviderEvents(connector)
      setOnUnsubscribe(() => clearSubscriptions)

      if (!tag) {
        addConnector(newConnector!)
      }

      setSelectedConnector(tag ? tag : newConnector?.getTag())
      setAutoConnectTag(tag ? tag : newConnector?.getTag())
      setLoading(false)
    },
    [connectors, onUnsubscribe]
  )

  const activateBrowserWallet = useCallback(async () => {
    await activate(MetamaskConnector)
    setAutoConnectTag(MetamaskConnector.tag)
  }, [connectors])

  useEffect(() => {
    setTimeout(async () => {
      try {
        if (autoConnectTag && autoConnect) {
          await detectEthereumProvider()

          // If window.ethereum._state.accounts is non null but has no items,
          // it probably means that the user has disconnected Metamask manually.
          if (autoConnectTag === MetamaskConnector.tag && (window.ethereum as any)?._state?.accounts?.length === 0) {
            return
          }

          await activate({ tag: autoConnectTag })
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }, [autoConnectTag, autoConnect, connectors])

  useEffect(() => {
    if (selectedConnector) {
      void activate({ tag: selectedConnector })
    }
  }, [selectedConnector])

  return (
    <NetworkContext.Provider
      value={{ network, activate, deactivate, reportError, activateBrowserWallet, isLoading }}
      children={children}
    />
  )
}
