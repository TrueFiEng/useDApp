import { ReactNode, useCallback, useState } from 'react'
import { ConnectorsContext } from './context'
import { initializeConnector } from '@web3-react/core'
import { EIP1193 } from '@web3-react/eip1193'
import { Provider } from '@ethersproject/providers'
import { ConnectorTuple } from '../../constants'

interface ConnectorsProviderProps {
  children: ReactNode
  defaultConnectors: ConnectorTuple[]
}

export function ConnectorsProvider({ defaultConnectors, children }: ConnectorsProviderProps) {
  const [connectors, setConnectors] = useState(defaultConnectors)
  const [activeConnector, setActiveConnector] = useState<ConnectorTuple | undefined>(defaultConnectors[0])

  const updateConnectors = useCallback(
    (_connectors: ConnectorTuple[]) => {
      setConnectors(_connectors)
      setActiveConnector(_connectors[0])
    },
    [setConnectors, setActiveConnector]
  )

  const setProvider = useCallback(
    (provider: Provider) => {
      const _connectors = [initializeConnector<EIP1193>((actions) => new EIP1193(actions, provider as any))]
      setConnectors(_connectors)
      setActiveConnector(_connectors[0])
    },
    [setConnectors, setActiveConnector]
  )

  return (
    <ConnectorsContext.Provider
      value={{ connectors, setConnectors: updateConnectors, activeConnector, setActiveConnector, setProvider }}
      children={children}
    />
  )
}
