import { createContext, useContext } from 'react'
import { Web3Provider } from '@ethersproject/providers'

export const InjectedNetworkContext = createContext<{
  injectedProvider: Web3Provider | undefined
  connect: () => Promise<Web3Provider | undefined>
}>({
  injectedProvider: undefined,
  connect: async () => undefined,
})

/**
 * @public
 */
export function useInjectedNetwork() {
  return useContext(InjectedNetworkContext)
}
