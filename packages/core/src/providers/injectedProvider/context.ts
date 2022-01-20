import { createContext, useContext } from 'react'
import { Web3Provider } from '@ethersproject/providers'

export const InjectedProviderContext = createContext<{
  injectedProvider: Web3Provider | undefined
  connect: () => Promise<Web3Provider | undefined>
}>({
  injectedProvider: undefined,
  connect: async () => undefined,
})

export function useInjectedProvider() {
  return useContext(InjectedProviderContext)
}
