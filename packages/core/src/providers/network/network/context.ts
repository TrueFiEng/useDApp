import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'
import { Network } from './model'
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'

export const NetworkContext = createContext<{
  update: (network: Partial<Network>) => void
  reportError: (error: Error) => void
  activate: (provider: JsonRpcProvider | ExternalProvider) => Promise<void>
  deactivate: () => void
  network: Network
  injectedProvider: Web3Provider | undefined
  connect: () => Promise<Web3Provider | undefined>
  activateBrowserWallet: () => void
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
  injectedProvider: undefined,
  connect: async () => undefined,
  activateBrowserWallet: () => undefined,
})

/**
 * @public
 */
export function useNetwork() {
  return useContext(NetworkContext)
}
