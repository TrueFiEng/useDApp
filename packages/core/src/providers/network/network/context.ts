import { createContext, useContext } from 'react'
import { ChainId } from '../../../constants'
import { Network } from './model'
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'

export const NetworkContext = createContext<{
  update: (network: Partial<Network>) => void
  reportError: (error: Error) => void
  activate: (provider: JsonRpcProvider | ExternalProvider) => Promise<void>
  deactivate: () => void
  network: Network
  activateBrowserWallet: () => void
  isLoading: boolean
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
  activateBrowserWallet: () => undefined,
  isLoading: true,
})

/**
 * @public
 */
export function useNetwork() {
  return useContext(NetworkContext)
}
