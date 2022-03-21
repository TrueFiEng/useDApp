import { JsonRpcProvider } from '@ethersproject/providers'
import { createContext, useContext } from 'react'

export interface ReadonlyNetworksContext {
  /**
   * A set of active read-only providers.
   */
  providers: Record<number, JsonRpcProvider | undefined>,
  /**
   * Request a new read-only connection if possible.
   * @returns true if the connection was successful.
   */
  connect: (chainId: number) => boolean,
}

export const ReadonlyNetworksContext = createContext<ReadonlyNetworksContext>({
  providers: {},
  connect: () => false,
})

export function useReadonlyNetworks() {
  return useContext(ReadonlyNetworksContext)
}
