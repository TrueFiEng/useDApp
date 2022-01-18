import { createContext, useContext } from 'react'
import { Provider } from '@ethersproject/providers'
import { ConnectorTuple } from '../../constants'

type ConnectorContextProps = {
  connectors: ConnectorTuple[]
  activeConnector?: ConnectorTuple
  setConnectors: (connectors: ConnectorTuple[]) => void
  setActiveConnector: (connectors: ConnectorTuple | undefined) => void
  setProvider: (provider: Provider) => void
}
export const ConnectorsContext = createContext<ConnectorContextProps>({
  connectors: [],
  activeConnector: undefined,
  setConnectors: () => undefined,
  setActiveConnector: () => undefined,
  setProvider: () => undefined,
})

export function useConnectors() {
  return useContext(ConnectorsContext)
}
