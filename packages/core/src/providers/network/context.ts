import { createContext, useContext } from 'react'
import { ChainId } from '../../constants'
import { Network } from './model'

export const NetworkContext = createContext<{
  update: (network: Network) => void
  network: Network
}>({
  network: {
    provider: undefined,
    chainId: ChainId.Mainnet,
    accounts: [],
  },
  update: () => undefined,
})

export function useNetwork() {
  return useContext(NetworkContext)
}
