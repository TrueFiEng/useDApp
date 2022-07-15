import { ReactNode, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networkReducer } from './reducer'
import { providers } from 'ethers'
import { subscribeToProviderEvents } from '../../../helpers'
import { useLocalStorage, useConfig } from '../../../hooks'
import { ConnectorContext, MetamaskConnector } from '../connector'
import { InjectedConnector } from '../connector/impls/injected'
import { ConnectorController } from '../connector/connectorController'
import { TestingWalletConnector } from '../connector/impls/testingWallet'

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
  const { connectors, setActiveConnectorTag, activeConnector, addConnector } = useContext(ConnectorContext)!

  const reportError = useCallback((error: Error) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }, [])

  const deactivate = useCallback(async () => {
    setAutoConnectTag(undefined)
    setLoading(true)
    await activeConnector?.deactivate()
    setActiveConnectorTag(undefined)
    setLoading(false)
  }, [activeConnector, connectors])

  useEffect(() => {
    if (providerOverride) {
      void activate(providerOverride)
    }
  }, [providerOverride])

  const activate = useCallback(
    async (provider: JsonRpcProvider | ExternalProvider | { tag: string }) => {
      const tag = 'tag' in provider ? provider.tag : undefined

      setLoading(true)
      const newConnector = !tag ? new InjectedConnector(provider as JsonRpcProvider | ExternalProvider) : undefined

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

      setActiveConnectorTag(tag ? tag : newConnector?.getTag())
      setAutoConnectTag(tag ? tag : newConnector?.getTag())
      setLoading(false)
    },
    [connectors, onUnsubscribe, subscribeToProviderEvents]
  )

  const activateBrowserWallet = useCallback(async () => {
    await activate(MetamaskConnector)
    setAutoConnectTag(MetamaskConnector.tag)
  }, [connectors])

  useEffect(() => {
    setTimeout(async () => {
      try {
        if (autoConnectTag && autoConnect && connectors.length > 0) {
          await activate({ tag: autoConnectTag })
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }, [autoConnectTag, autoConnect, connectors])

  return (
    <NetworkContext.Provider
      value={{ network, activate, deactivate, reportError, activateBrowserWallet, isLoading }}
      children={children}
    />
  )
}
