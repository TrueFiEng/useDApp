import { createContext, ReactNode, useEffect, useState } from 'react'
import { useConfig } from '../../../hooks'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'

interface ConnectorContextValue {
  connectors: ConnectorController[]
  addConnector(connector: Connector): void
  activeConnectorTag: string | undefined
  setActiveConnectorTag(tag: string | undefined): void
  activeConnector: ConnectorController | undefined
}

export const ConnectorContext = createContext<ConnectorContextValue | undefined>(undefined)

export interface ConnectorContextProviderProps {
  children?: ReactNode
}

export function ConnectorContextProvider({ children }: ConnectorContextProviderProps) {
  const [controllers, setControllers] = useState<ConnectorController[]>([])
  const [activeConnectorTag, setActiveConnectorTag] = useState<string | undefined>()
  const { connectors } = useConfig()

  const activeConnector = controllers.find((c) => c.connector.getTag() === activeConnectorTag)

  useEffect(() => {
    const newControllers = connectors.map((connector) => {
      const existing = controllers.find((c) => c.connector === connector)
      if (existing) {
        return existing
      }
      return new ConnectorController(connector)
    })
    const otherControllers = controllers.filter((c) => !newControllers.some((c2) => c2.connector === c.connector))
    setControllers([...newControllers, ...otherControllers].sort((a, b) => a.connector.priority - b.connector.priority))
  }, [...connectors])

  function addConnector(connector: Connector) {
    setControllers(controllers.concat(new ConnectorController(connector)))
  }

  return (
    <ConnectorContext.Provider
      value={{ connectors: controllers, addConnector, activeConnector, activeConnectorTag, setActiveConnectorTag }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}
