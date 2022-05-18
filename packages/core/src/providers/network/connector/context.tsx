import { createContext, ReactNode, useEffect, useState } from 'react'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'

interface ConnectorContextValue {
  connectors: ConnectorController[]
  addConnector(connector: Connector): void
}

export const ConnectorContext = createContext<ConnectorContextValue | undefined>(undefined)

export interface ConnectorContextProviderProps {
  connectors: Connector[]
  children?: ReactNode
}

export function ConnectorContextProvider({ connectors, children }: ConnectorContextProviderProps) {
  const [controllers, setControllers] = useState<ConnectorController[]>([])

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
  }, connectors)

  function addConnector(connector: Connector) {
    setControllers(controllers.concat(new ConnectorController(connector)))
  }

  return (
    <ConnectorContext.Provider value={{ connectors: controllers, addConnector }}>{children}</ConnectorContext.Provider>
  )
}
