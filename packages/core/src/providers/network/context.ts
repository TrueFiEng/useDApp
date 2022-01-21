import { createContext, useContext } from 'react'
import { ChainId } from '../../constants'
import { Network } from './model'

export const NetworkContext = createContext<{
  update: (network: Partial<Network>) => void
  reportError: (error: Error | string) => void
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
})

export function useNetwork() {
  return useContext(NetworkContext)
}
