import { providers } from 'ethers'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useConfig, useLocalStorage } from '../../../hooks'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'
import { InjectedConnector, MetamaskConnector } from './implementations'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider
const Provider = providers.Provider
const Web3Provider = providers.Web3Provider

export type ActivateBrowserWallet = (arg: {
  type: string
}) => void

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
  activate: async () => {},
  deactivate: () => {},
  activateBrowserWallet: () => {},
  reportError: () => {},
  isLoading: false
})

export interface ConnectorContextProviderProps {
  children?: ReactNode
}

export function ConnectorContextProvider({ children }: ConnectorContextProviderProps) {
  const [controller, setController] = useState<ConnectorController>()
  const [isLoading, setLoading] = useState(false)
  const { connectors, autoConnect } = useConfig()
  const [autoConnectTag, setAutoConnectTag] = useLocalStorage('usedapp:autoConnectTag')

  const activate = useCallback(
    async (providerOrConnector: JsonRpcProvider | ExternalProvider | Connector) => {
      let controller: ConnectorController
      if ('activate' in providerOrConnector) {
        controller = new ConnectorController(providerOrConnector)
      } else {
        const wrappedProvider = Provider.isProvider(providerOrConnector) ? providerOrConnector : new Web3Provider(providerOrConnector)
        controller = new ConnectorController(new InjectedConnector(wrappedProvider))
      }
      setLoading(true)
      try {
        await controller.activate()
  
        setController(controller)
        setLoading(false)
      } catch (error) {
        controller.errors.push(error as any)
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
      console.log('Setting autoConnectTag to', { type })
      setAutoConnectTag(type)
    },
    [activate, setAutoConnectTag, connectors]
  )

  useEffect(() => {
    if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
      activateBrowserWallet({ type: autoConnectTag })
    }
  }, [autoConnectTag, connectors, autoConnect])

  return (
    <ConnectorContext.Provider
      value={{
        connector: controller,
        deactivate: async () => {
          setAutoConnectTag(undefined)
          setLoading(true)
          await controller?.deactivate()
          setLoading(false)
        },
        reportError: (err) => {
          controller?.reportError(err)
        },
        activate,
        activateBrowserWallet,
        isLoading
      }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnector = () => useContext(ConnectorContext)
