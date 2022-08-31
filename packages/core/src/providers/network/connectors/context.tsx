import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'
import { MetamaskConnector } from './implementations'

interface ConnectorContextValue {
  connector: ConnectorController | undefined
  activate: (connector: Connector) => Promise<void>
  deactivate: () => void 
  activateBrowserWallet: () => void
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

  const activate = useCallback(
    async (connector: Connector) => {
      const controller = new ConnectorController(connector)
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

  const activateBrowserWallet = useCallback(async () => {
    await activate(new MetamaskConnector())
  }, [activate])

  return (
    <ConnectorContext.Provider
      value={{
        connector: controller,
        deactivate: () => controller?.deactivate(),
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
