import { createContext, useContext } from 'react'
import { ReadonlyNetworksModel } from './model'

export const ReadonlyNetworksContext = createContext<ReadonlyNetworksModel>({
  providers: {},
  updateNetworkState: () => undefined,
  networkStates: {},
})

export function useReadonlyNetworks() {
  return useContext(ReadonlyNetworksContext).providers
}

export function useUpdateNetworksState() {
  return useContext(ReadonlyNetworksContext).updateNetworkState
}

export function useReadonlyNetworkStates() {
  return useContext(ReadonlyNetworksContext).networkStates
}
