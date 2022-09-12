import { providers } from 'ethers'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useConfig, useLocalStorage } from '../../../hooks'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'
import { InjectedConnector } from './implementations'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider
const Provider = providers.Provider
const Web3Provider = providers.Web3Provider

export type ActivateBrowserWallet = (arg?: { type: string }) => void

interface ConnectorContextValue {
  connector: ConnectorController | undefined
  activate: (providerOrConnector: JsonRpcProvider | ExternalProvider | Connector) => Promise<void>
  deactivate: () => void
  activateBrowserWallet: ActivateBrowserWallet
  reportError: (error: Error) => void
  isLoading: boolean
}

export const ConnectorContext = createContext<ConnectorContextValue>({
  connector: undefined,
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  activate: async () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  deactivate: () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  activateBrowserWallet: () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  reportError: () => {},
  isLoading: false,
})

export interface ConnectorContextProviderProps {
  children?: ReactNode
}

export function ConnectorContextProvider({ children }: ConnectorContextProviderProps) {
  const [controller, setController] = useState<ConnectorController>()
  const [isLoading, setLoading] = useState(false)
  const config = useConfig()
  const { connectors, autoConnect } = config
  const [autoConnectTag, setAutoConnectTag] = useLocalStorage('usedapp:autoConnectTag')

  const activate = useCallback(
    async (providerOrConnector: JsonRpcProvider | ExternalProvider | Connector, silently = false) => {
      let controller: ConnectorController
      if ('activate' in providerOrConnector) {
        controller = new ConnectorController(providerOrConnector, config as any)
      } else {
        const wrappedProvider = Provider.isProvider(providerOrConnector)
          ? providerOrConnector
          : new Web3Provider(providerOrConnector)
        controller = new ConnectorController(new InjectedConnector(wrappedProvider), config as any)
      }
      setLoading(true)
      try {
        if (silently) {
          await controller.activate((connector) => connector.connectEagerly())
        } else {
          await controller.activate()
        }

        setController(controller)
        setLoading(false)
      } catch (error) {
        controller.reportError(error as any)
      } finally {
        setLoading(false)
      }
    },
    [setController, setLoading]
  )

  const activateBrowserWallet: ActivateBrowserWallet = useCallback(
    async ({ type } = { type: 'metamask' }) => {
      if (!connectors[type]) {
        throw new Error(`Connector ${type} is not configured`)
      }
      await activate(connectors[type])
      setAutoConnectTag(type)
    },
    [activate, setAutoConnectTag, connectors]
  )

  useEffect(() => {
    if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
      void activate(connectors[autoConnectTag], true)
    }
  }, [])

  useEffect(() => {
    controller?.updateConfig(config)
  }, [controller, config])

  return (
    <ConnectorContext.Provider
      value={{
        connector: controller,
        deactivate: async () => {
          setAutoConnectTag(undefined)
          setLoading(true)
          await controller?.deactivate()
          setController(undefined)
          setLoading(false)
        },
        reportError: (err) => {
          controller?.reportError(err)
        },
        activate,
        activateBrowserWallet,
        isLoading,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnector = () => useContext(ConnectorContext)
