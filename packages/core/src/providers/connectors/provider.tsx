import { ReactNode, useState } from 'react'
import { ConnectorsContext } from './context'
import { Connector } from '@web3-react/types'
import { Web3ReactHooks } from '@web3-react/core'

interface ConnectorsProviderProps {
  children: ReactNode
  defaultConnectors: [Connector, Web3ReactHooks][]
}

export function ConnectorsProvider({ defaultConnectors, children }: ConnectorsProviderProps) {
  const [connectors, setConnectors] = useState(defaultConnectors)
  return <ConnectorsContext.Provider value={{ connectors, setConnectors }} children={children} />
}
