import { createContext, useContext } from 'react'
import { Connector } from '@web3-react/types'
import { Web3ReactHooks } from '@web3-react/core'

export const ConnectorsContext = createContext<{ connectors: [Connector, Web3ReactHooks][], setConnectors: (connectors: [Connector, Web3ReactHooks][]) => void }>({
  connectors: [],
  setConnectors: () => undefined,
})

export function useConnectors() {
  return useContext(ConnectorsContext)
}
