import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'
import { Network } from './model'
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { EventEmitter } from 'events'

export const ActiveNetworkContext = createContext<{
  update: (network: Partial<Network>) => void
  reportError: (error: Error) => void
  activate: (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => Promise<void>
  deactivate: () => void
  network: Network
}>({
  network: {
    provider: undefined,
    chainId: ChainId.Mainnet,
    accounts: [],
    errors: [],
  },
  update: () => undefined,
  reportError: () => undefined,
  activate: async () => undefined,
  deactivate: () => undefined,
})

export function useNetwork() {
  return useContext(ActiveNetworkContext)
}

export function useActiveNetwork() {
  return useContext(ActiveNetworkContext)
}
