import { createContext, useContext } from 'react'
import { ChainId } from '../../constants'
import { Network } from './model'
import { Web3Provider } from '@ethersproject/providers'

export const NetworkContext = createContext<{
  update: (network: Network) => void
  network: Network
  injectedProvider?: Web3Provider
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
