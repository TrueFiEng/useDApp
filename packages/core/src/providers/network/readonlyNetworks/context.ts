import { createContext, useContext } from 'react'
import { Providers } from './model'

export const ReadonlyNetworksContext = createContext<Providers>({})

export function useReadonlyNetworks() {
  return useContext(ReadonlyNetworksContext)
}
