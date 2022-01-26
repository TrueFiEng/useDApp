import { createContext, useContext } from 'react'
import { ChainId } from '../../constants'
import { Network, NetworkError } from './model'
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { EventEmitter } from 'events'

export const NetworkContext = createContext<{
  update: (network: Partial<Network>) => void
  reportError: (error: Error) => void
  activate: (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => Promise<void>
  deactivate: () => void
  network: Network
  errors: NetworkError[]
}>({
  network: {
    provider: undefined,
    chainId: ChainId.Mainnet,
    accounts: [],
  },
  update: () => undefined,
  reportError: () => undefined,
  activate: async () => undefined,
  deactivate: () => undefined,
  errors: [],
})

export function useNetwork() {
  return useContext(NetworkContext)
}
